import chroma from "chroma-js";

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoia3R1emlub3dza2kiLCJhIjoiY2x1djlvOWM3MDE4NDJqbGx2aWx6djh2dSJ9.jJ8agn3EPWlLE_u8VsAs4w";

export const COLORS = [
    'rgb(0, 102, 204)',    // Blue
    'rgb(255, 51, 51)',    // Red
    'rgb(51, 204, 51)',     // Green
    'rgb(255, 204, 0)',     // Yellow
    'rgb(153, 51, 255)',    // Purple
    'rgb(255, 128, 0)',     // Orange
    'rgb(0, 204, 204)',      // Cyan
    'rgb(204, 0, 204)',      // Magenta
    'rgb(102, 0, 0)',        // Dark Red
    'rgb(0, 0, 102)',        // Dark Blue
    'rgb(255, 0, 127)',    // Bright Pink
    'rgb(0, 128, 255)',    // Light Blue
    'rgb(255, 165, 0)',     // Bright Orange
    'rgb(75, 0, 130)',      // Indigo
    'rgb(0, 255, 127)',     // Spring Green
    'rgb(204, 204, 255)',   // Lavender
    'rgb(255, 99, 71)',     // Tomato
    'rgb(34, 139, 34)',     // Forest Green
    'rgb(255, 20, 147)',    // Deep Pink
    'rgb(127, 255, 0)',     // Chartreuse
    'rgb(255, 218, 185)',    // Peach
    'rgb(135, 206, 250)',   // Light Sky Blue
    'rgb(186, 85, 211)',    // Medium Orchid
    'rgb(255, 140, 0)',     // Dark Orange
    'rgb(255, 0, 255)',     // Magenta
    'rgb(128, 0, 0)',       // Maroon
    'rgb(0, 128, 128)',     // Teal
    'rgb(221, 160, 221)',   // Plum
    'rgb(0, 255, 255)',     // Aqua
    'rgb(100, 149, 237)',   // Cornflower Blue
    'rgb(240, 230, 140)',    // Khaki
    'rgb(0, 100, 0)',       // Dark Green
    'rgb(255, 192, 203)',   // Pink
    'rgb(173, 216, 230)',   // Light Blue
    'rgb(189, 183, 107)',   // Dark Khaki
    'rgb(70, 130, 180)',    // Steel Blue
    'rgb(255, 215, 0)',     // Gold
    'rgb(205, 92, 92)',     // Indian Red
    'rgb(255, 99, 0)',      // Bright Red-Orange
    'rgb(0, 191, 255)',     // Deep Sky Blue
    'rgb(139, 69, 19)',     // Saddle Brown
    'rgb(160, 82, 45)',     // Sienna
  ];

//choropleth color scale
export const colorScale = chroma
.scale(["#e6ffe6", "#00cc00", "#004d00"]) // Light green to dark green
.domain([0, 100]);

// Choropleth color scale with shades of red
export const colorScaleRed = chroma
.scale(["#ffe6e6", "#ff4d4d", "#990000"]) // Light red to dark red
.domain([0, 100]);

// Choropleth color scale with shades of blue
export const colorScaleBlue = chroma
.scale(["#e6f0ff", "#4d79ff", "#003399"]) // Light blue to dark blue
.domain([0, 100]);

export const argbToRgb = (argbColor) => {
  // Convert to unsigned 32-bit if the number is negative
  if (argbColor < 0) {
      argbColor = argbColor + 0xFFFFFFFF + 1;
  }

  // Extract RGB components
  const red = (argbColor >> 16) & 0xFF;
  const green = (argbColor >> 8) & 0xFF;
  const blue = argbColor & 0xFF;
  return `rgb(${red}, ${green}, ${blue})`
}

export const centerOfTheUS = [39.8283, -98.5795];
export const boundsForTheUS = [
  [24.396308, -125.0],
  [49.384358, -66.93457]
];

export const defaultZoom = 4;
export const defaultMinZoom = 4;
export const defaultMaxZoom = 8;

export const ActiveLayers = {
  Districts: "districts",
  Precincts: "precincts"
}

export const ColorDistrictsOptions = {
  Current: "Current",
  SMD: "SMD",
  MMD: "MMD"
}

export const ViewDataOptions = {
  Current: "Current",
  SMD: "SMD",
  MMD: "MMD",
  Precincts: "Precincts"
}

export const BoundaryChoroplethOptions = {
  Current: "Current",
  SMD: "SMD",
  MMD: "MMD",
  Precincts: "Precincts"
}