import geopandas as gpd
import pandas as pd
import maup

blocks = gpd.read_file("src/utah_data/repaired_blocks.geojson").to_crs(26912)
precincts = gpd.read_file("src/utah_data/repaired_precincts.geojson").to_crs(26912)

variables = ["PP_TOTAL", "PP_WHTALN", "PP_BAAALN", "PP_NAMALN", "PP_ASNALN", "PP_HPIALN", "PP_HISPLAT", "PP_OTHALN"]

blocks_to_precincts_assignment = maup.assign(blocks, precincts)

precincts[variables] = blocks[variables].groupby(blocks_to_precincts_assignment).sum()

precincts_with_nan = precincts[variables].isnull().any(axis=1)

nan_precincts_count = precincts_with_nan.sum()

total_precincts = len(precincts)

nan_percentage = (nan_precincts_count / total_precincts) * 100

print(f"Number of precincts with NaN values in any variable: {nan_precincts_count}")
print(f"Percentage of precincts with NaN values: {nan_percentage:.2f}%")

print(precincts[variables].head())

precincts.to_file("utahAggPrecincts.geojson", driver='GeoJSON')