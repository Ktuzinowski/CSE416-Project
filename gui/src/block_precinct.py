import geopandas as gpd
import pandas as pd
import maup

# hello

# Load the data
blocks = gpd.read_file("src/utah_data/repaired_blocks.geojson").to_crs(26912)
precincts = gpd.read_file("src/utah_data/repaired_precincts.geojson").to_crs(26912)

# Update the variables array to match the column names in your blocks data
variables = ["PP_TOTAL", "PP_WHTALN", "PP_BAAALN", "PP_NAMALN", "PP_ASNALN", "PP_HPIALN", "PP_HISPLAT", "PP_OTHALN"]

# Use maup to assign blocks to precincts based on spatial location
blocks_to_precincts_assignment = maup.assign(blocks, precincts)

# Aggregate the block data by precinct using the assignment and sum the values
precincts[variables] = blocks[variables].groupby(blocks_to_precincts_assignment).sum()

# Check if any of the variables is NaN for a precinct
precincts_with_nan = precincts[variables].isnull().any(axis=1)

# Count how many precincts have NaN values
nan_precincts_count = precincts_with_nan.sum()

# Total number of precincts
total_precincts = len(precincts)

# Calculate the percentage of precincts with NaN values
nan_percentage = (nan_precincts_count / total_precincts) * 100

# Display the results
print(f"Number of precincts with NaN values in any variable: {nan_precincts_count}")
print(f"Percentage of precincts with NaN values: {nan_percentage:.2f}%")

# View the results
print(precincts[variables].head())