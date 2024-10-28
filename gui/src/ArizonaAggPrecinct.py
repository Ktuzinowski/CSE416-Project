import geopandas
import pandas as pd
import maup

#yang used this to aggregate the arizona census block data into the precincts

blocks = geopandas.read_file("src/arizona_data/ArizonaBlocks.geojson").to_crs(26913)
precincts = geopandas.read_file("src/arizona_data/ArizonaPrecincts.geojson").to_crs(26913)

#pop total, white, blk, hispanic, asian, native, pacific, other
variables = ["CVAP_TOT20", "CVAP_WHT20", "CVAP_BLK20","CVAP_HSP20", "CVAP_ASN20", "CVAP_AIA20", "CVAP_NHP20"]

#"G20PRERTRU", "G20PREDBID", "G20PRELJOR", "G20PREGHAW", "G20PREOWRI"]

# Use maup to assign blocks to precincts based on spatial location
blocks_to_precincts_assignment = maup.assign(blocks, precincts)

# Aggregate the block data by precinct using the assignment and sum the values
precincts[variables] = blocks[variables].groupby(blocks_to_precincts_assignment).sum()

precincts.to_file("ArizonaAggPrecinct.geojson", driver='GeoJSON')

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