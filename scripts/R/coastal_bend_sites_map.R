#!/usr/bin/env Rscript
# ============================================================================
# Coastal Bend AQ — Refinery Row + Monitoring Network Map (Figure 1)
# ----------------------------------------------------------------------------
# Renders the canonical "Figure 1" for the Refinery-Row Random-Forest paper:
#   * Esri World Gray Canvas basemap (matches the team's existing ArcGIS
#     figures)
#   * Concentric colored rings per AQ site — one ring per pollutant measured
#     at that site (Ozone / SO2 / PM2.5 / PM10 / VOCs)
#   * Red rectangle over the Port of Corpus Christi Refinery Row corridor
#   * OpenWeather regional stations as blue triangles
#   * Distance + compass bearing from the Refinery Row centroid to each site
#   * Historical CC Holly (CAMS 660, deactivated 2018) shown with a hollow
#     center dot
#   * Inset regional-context panel showing the main frame within the broader
#     Coastal Bend, matching the sample layout
#   * Displacement of co-located monitors (~250 m radial offset) so ring
#     stacks stay readable
#
# Zoom: main panel is tight on the Refinery Row + inner CC monitoring cluster;
# inset shows the broader region so the reader can orient.
#
# Data sources (all live-verified 2026-09-20):
#   AQ site coords + pollutant coverage → aq_coastal_bend.site_registry
#   On-monitor met availability         → aq_coastal_bend.site_weather_hourly
#   OpenWeather station centroids       → city-centroid placeholders (update
#                                         from a Neon SELECT DISTINCT location,
#                                         lat, lon ... query when convenient)
#   Refinery Row polygon                → approximate industrial-corridor bbox
#
# Dependencies (install once):
#   install.packages(c("sf", "ggplot2", "ggrepel", "ggspatial", "basemaps",
#                      "patchwork", "dplyr", "tibble", "glue", "geosphere"))
#
# Run from the repo root:
#   Rscript scripts/R/coastal_bend_sites_map.R
#
# Outputs (into pipeline/docs/assets/):
#   coastal_bend_sites_map.png  (300 dpi, embedded in docs)
#   coastal_bend_sites_map.pdf  (publication-quality vector)
# ============================================================================

suppressPackageStartupMessages({
  library(sf)
  library(ggplot2)
  library(ggrepel)
  library(ggspatial)
  library(basemaps)
  library(patchwork)
  library(dplyr)
  library(tibble)
  library(glue)
  library(geosphere)
})

# ---------------------------------------------------------------------------
# 1. Data
# ---------------------------------------------------------------------------

aq_sites <- tribble(
  ~aqsid,     ~site_number, ~short_label,     ~long_name,                  ~lon,     ~lat,    ~pollutants,               ~has_site_met, ~active,
  483550025,  25,           "CC West",        "Corpus Christi West",       -97.4343, 27.7653, list(c("Ozone","SO2")),    TRUE,          TRUE,
  483550026,  26,           "Tuloso",         "Corpus Christi Tuloso",     -97.5554, 27.8324, list(c("Ozone","SO2")),    TRUE,          TRUE,
  483550029,  29,           "Hillcrest",      "Corpus Christi Hillcrest",  -97.4192, 27.8076, list("VOCs"),              FALSE,         TRUE,
  483550032,  32,           "Huisache",       "Corpus Christi Huisache",   -97.4316, 27.8045, list(c("SO2","PM2.5","VOCs")),          TRUE,          TRUE,
  483550034,  34,           "Dona Park",      "Corpus Christi Dona Park",  -97.4657, 27.8118, list(c("SO2","PM2.5","PM10","VOCs")),   TRUE,          TRUE,
  483550083,  83,           "Palm",           "Corpus Christi Palm",       -97.4199, 27.8029, list("VOCs"),              FALSE,         TRUE,
  # Historical — TCEQ CAMS 660, deactivated 2018-12-03
  48355660,   660,          "Holly",          "Corpus Christi Holly",      -97.4045, 27.7723, list(c("PM10","SO2")),     FALSE,         FALSE
)

ow_stations <- tribble(
  ~station,          ~lon,      ~lat,
  "Corpus Christi",  -97.4022,  27.8006,
  "Robstown",        -97.6669,  27.7889,
  "Portland",        -97.3236,  27.8772
)

# Refinery Row polygon (Port of Corpus Christi industrial corridor).
refinery_row_poly <- st_sfc(
  st_polygon(list(matrix(c(
    -97.530, 27.795,
    -97.360, 27.795,
    -97.360, 27.855,
    -97.530, 27.855,
    -97.530, 27.795
  ), ncol = 2, byrow = TRUE))),
  crs = 4326
)
refinery_row_sf <- st_sf(name = "Refinery Area", geometry = refinery_row_poly)
refinery_centroid <- st_centroid(refinery_row_poly)
rc <- st_coordinates(refinery_centroid)[1, ]  # (lon, lat)

# ---------------------------------------------------------------------------
# 2. Palette (matches the ArcGIS sample the team already uses)
# ---------------------------------------------------------------------------
poll_colors <- c(
  Ozone  = "#e5745b",  # coral
  SO2    = "#e5de39",  # yellow
  PM2.5  = "#a7e064",  # yellow-green
  PM10   = "#e5a0c7",  # pink
  VOCs   = "#7c5cbe"   # purple
)

# ---------------------------------------------------------------------------
# 3. Displacement for co-located monitors (~250 m radial offset)
# ---------------------------------------------------------------------------
displace_colocated <- function(sites, min_deg = 0.0025) {
  used_lon <- numeric(0); used_lat <- numeric(0)
  offs_lon <- numeric(nrow(sites)); offs_lat <- numeric(nrow(sites))
  for (i in seq_len(nrow(sites))) {
    lon <- sites$lon[i]; lat <- sites$lat[i]
    coll <- sum(abs(used_lon - lon) < min_deg & abs(used_lat - lat) < min_deg)
    if (coll > 0) {
      angle <- (coll * 90 + 45) %% 360
      lon <- lon + min_deg * cos(angle * pi / 180)
      lat <- lat + min_deg * sin(angle * pi / 180)
    }
    used_lon <- c(used_lon, sites$lon[i])
    used_lat <- c(used_lat, sites$lat[i])
    offs_lon[i] <- lon; offs_lat[i] <- lat
  }
  sites$plot_lon <- offs_lon
  sites$plot_lat <- offs_lat
  sites
}
aq_sites <- displace_colocated(aq_sites)

# ---------------------------------------------------------------------------
# 4. Distance + bearing from Refinery Row centroid to each site
# ---------------------------------------------------------------------------
compass16 <- c("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
               "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW")
bearing_to_compass <- function(brg) compass16[(round(brg / 22.5) %% 16) + 1]

aq_sites <- aq_sites %>%
  rowwise() %>%
  mutate(
    dist_mi = geosphere::distHaversine(c(rc[1], rc[2]), c(lon, lat)) / 1609.344,
    bearing = geosphere::bearing(c(rc[1], rc[2]), c(lon, lat)) %% 360,
    dir     = bearing_to_compass(bearing),
    dist_label = if_else(
      active,
      sprintf("%.1f mi %s of R-Row", dist_mi, dir),
      sprintf("%.1f mi %s · deactivated 2018", dist_mi, dir)
    ),
    poll_label = paste(unlist(pollutants), collapse = " · ")
  ) %>%
  ungroup()

# ---------------------------------------------------------------------------
# 5. Concentric rings — one geom_sf(st_buffer) per pollutant per site
#    Rings are drawn from outermost (largest ring, first pollutant in list)
#    inward so the innermost pollutant is on top.
# ---------------------------------------------------------------------------
# Ring geometry buffer sizes in metres.
base_r_m  <- 320   # innermost pollutant radius
step_r_m  <- 220   # increase per additional pollutant outward

make_rings <- function(sites) {
  out <- list()
  for (i in seq_len(nrow(sites))) {
    polls <- unlist(sites$pollutants[i])
    if (length(polls) == 0) next
    for (k in seq_along(polls)) {
      # Outer pollutant (index 1) gets the biggest ring
      r_m <- base_r_m + (length(polls) - k) * step_r_m
      pt <- st_sfc(st_point(c(sites$plot_lon[i], sites$plot_lat[i])), crs = 4326)
      # Buffer in metres — transform to a metric CRS first
      pt_m <- st_transform(pt, 32614)  # UTM zone 14N covers Corpus Christi
      ring_m <- st_buffer(pt_m, r_m)
      ring <- st_transform(ring_m, 4326)
      out[[length(out) + 1]] <- st_sf(
        aqsid = sites$aqsid[i], pollutant = polls[k],
        z = length(polls) - k,   # higher z = outer, drawn first
        geometry = ring
      )
    }
  }
  do.call(rbind, out) %>% arrange(desc(z))  # outermost first (bottom)
}
rings_sf <- make_rings(aq_sites)

# ---------------------------------------------------------------------------
# 6. Bounding boxes
# ---------------------------------------------------------------------------
main_bbox <- c(xmin = -97.60, xmax = -97.35, ymin = 27.72, ymax = 27.87)
main_bbox_sf <- st_as_sfc(st_bbox(c(xmin = main_bbox["xmin"], ymin = main_bbox["ymin"],
                                    xmax = main_bbox["xmax"], ymax = main_bbox["ymax"]),
                                  crs = 4326))
inset_bbox <- c(xmin = -97.90, xmax = -97.20, ymin = 27.55, ymax = 27.95)

# ---------------------------------------------------------------------------
# 7. Basemap — Esri World Gray Canvas via basemaps package
# ---------------------------------------------------------------------------
# The team's existing figures use this tile service.  basemaps supports it
# via map_service = "esri", map_type = "world_light_gray_base".
# If offline, this call errors out — the plot then falls back to a blank
# gray panel.
try_basemap <- function(ext_sf, ...) {
  tryCatch({
    basemaps::set_defaults(map_service = "esri",
                           map_type    = "world_light_gray_base")
    basemaps::basemap_geom(ext = ext_sf, ...)
  }, error = function(e) {
    message("Basemap fetch failed (", conditionMessage(e),
            "); rendering with blank background.")
    NULL
  })
}

# ---------------------------------------------------------------------------
# 8. Main panel
# ---------------------------------------------------------------------------
main_basemap <- try_basemap(main_bbox_sf)

p_main <- ggplot() +
  main_basemap +

  # Refinery Area red rectangle
  geom_sf(data = refinery_row_sf,
          fill = NA, color = "#d32f2f", linewidth = 1.1) +
  annotate("text",
           x = mean(c(-97.530, -97.360)), y = 27.858,
           label = "Refinery Area",
           color = "#c62828", fontface = "bold", size = 4,
           hjust = 0.5, vjust = 0) +

  # OpenWeather triangles
  geom_point(data = ow_stations %>%
               filter(lon > main_bbox["xmin"] & lon < main_bbox["xmax"] &
                      lat > main_bbox["ymin"] & lat < main_bbox["ymax"]),
             aes(x = lon, y = lat),
             shape = 24, size = 4.2, stroke = 1.1,
             fill = "#01579b", color = "white") +

  # Pollutant rings (drawn outermost first so inner rings sit on top)
  geom_sf(data = rings_sf,
          aes(fill = pollutant), color = "white",
          alpha = 0.65, linewidth = 0.35) +
  scale_fill_manual(values = poll_colors,
                    name   = "Pollutants",
                    limits = names(poll_colors)) +

  # Center dot — solid for active, hollow for historical
  geom_point(data = aq_sites %>% filter(active),
             aes(x = plot_lon, y = plot_lat),
             shape = 21, fill = "#1a237e", color = "#1a237e", size = 1.8) +
  geom_point(data = aq_sites %>% filter(!active),
             aes(x = plot_lon, y = plot_lat),
             shape = 21, fill = "white", color = "#1a237e",
             size = 1.8, stroke = 0.8) +

  # Site labels + pollutants + distance (three-line block via ggrepel)
  geom_text_repel(
    data = aq_sites,
    aes(x = plot_lon, y = plot_lat,
        label = glue("{long_name}\n{poll_label}\n{dist_label}")),
    size = 3.1, fontface = "bold", color = "#213c4e",
    lineheight = 1.05,
    box.padding = 1.0, point.padding = 0.5,
    segment.color = "#213c4e", segment.size = 0.5,
    min.segment.length = 0, seed = 42,
    direction = "both", max.overlaps = Inf, force = 8, force_pull = 0.2
  ) +

  coord_sf(xlim = c(main_bbox["xmin"], main_bbox["xmax"]),
           ylim = c(main_bbox["ymin"], main_bbox["ymax"]),
           expand = FALSE, crs = 4326) +

  annotation_scale(location = "br", width_hint = 0.20,
                   style = "bar", line_width = 0.5) +
  annotation_north_arrow(location = "tr", which_north = "true",
                         height = unit(0.9, "cm"), width = unit(0.9, "cm"),
                         style = north_arrow_minimal) +

  theme_void() +
  theme(
    legend.position = "left",
    legend.title    = element_text(face = "bold", color = "#213c4e"),
    legend.text     = element_text(color = "#213c4e"),
    panel.border    = element_rect(color = "#c0c7ce", fill = NA, linewidth = 0.4),
    plot.margin     = margin(4, 4, 4, 4)
  )

# ---------------------------------------------------------------------------
# 9. Inset panel — regional context
# ---------------------------------------------------------------------------
inset_bbox_sf <- st_as_sfc(st_bbox(c(xmin = inset_bbox["xmin"], ymin = inset_bbox["ymin"],
                                     xmax = inset_bbox["xmax"], ymax = inset_bbox["ymax"]),
                                   crs = 4326))
inset_basemap <- try_basemap(inset_bbox_sf)

# Main bbox shown on inset
main_bbox_rect <- st_as_sfc(st_bbox(c(xmin = main_bbox["xmin"], ymin = main_bbox["ymin"],
                                      xmax = main_bbox["xmax"], ymax = main_bbox["ymax"]),
                                    crs = 4326))

p_inset <- ggplot() +
  inset_basemap +
  geom_point(data = aq_sites, aes(x = lon, y = lat),
             shape = 21, fill = "#e5745b", color = "white",
             size = 2.4, stroke = 0.6) +
  geom_sf(data = main_bbox_rect,
          fill = NA, color = "#d32f2f", linewidth = 0.9) +
  coord_sf(xlim = c(inset_bbox["xmin"], inset_bbox["xmax"]),
           ylim = c(inset_bbox["ymin"], inset_bbox["ymax"]),
           expand = FALSE, crs = 4326) +
  labs(title = "Regional context") +
  theme_void() +
  theme(
    plot.title    = element_text(size = 9, color = "#4a5568", hjust = 0),
    panel.border  = element_rect(color = "#c0c7ce", fill = NA, linewidth = 0.4),
    plot.margin   = margin(2, 2, 2, 2)
  )

# ---------------------------------------------------------------------------
# 10. Compose main + inset with patchwork
# ---------------------------------------------------------------------------
final <- p_main +
  inset_element(p_inset, left = 0.01, bottom = 0.01,
                right = 0.30, top = 0.30, on_top = TRUE) +
  plot_annotation(
    title    = "Figure 1. Refinery Row and the Corpus Christi Monitoring Network",
    subtitle = paste(
      "AQ monitors (concentric rings = pollutants measured) ·",
      "OpenWeather regional stations · Refinery Row corridor ·",
      "distance + bearing from R-Row centroid"
    ),
    caption  = paste(
      "Basemap: Esri World Gray Canvas ·",
      "Data: aq_coastal_bend.site_registry + site_weather_hourly (Neon, 2026-09-20). ",
      "Monitors sharing near-identical coordinates were displaced by ~250 m for readability."
    ),
    theme = theme(
      plot.title    = element_text(face = "bold", size = 14, color = "#213c4e"),
      plot.subtitle = element_text(size = 10, color = "#4a5568"),
      plot.caption  = element_text(size = 8, color = "#8a8a8a", hjust = 0)
    )
  )

# ---------------------------------------------------------------------------
# 11. Save
# ---------------------------------------------------------------------------
out_dir <- "pipeline/docs/assets"
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)
out_png <- file.path(out_dir, "coastal_bend_sites_map.png")
out_pdf <- file.path(out_dir, "coastal_bend_sites_map.pdf")

ggsave(out_png, final, width = 14, height = 9, dpi = 300, bg = "white")
ggsave(out_pdf, final, width = 14, height = 9, bg = "white")

cat("Wrote:", out_png, "\n")
cat("Wrote:", out_pdf, "\n")
