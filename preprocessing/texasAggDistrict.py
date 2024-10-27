import geopandas
import maup
import pandas

# yang used this to aggregate the precincts into the Districts, which now have the racial demographics and election data.

precincts = geopandas.read_file("src/texas_data/texasAggPrecinct.geojson").to_crs(26914)
districts = geopandas.read_file("src/texas_data/texas_congressional_plan.geojson").to_crs(26914)

#white, blk, hispanic, asian, native, pacific, other
#trump biden, Jo Jorgensen, Howie Hawkins, Write-in Votes
variables = ["TOT_POP21", "WHT_NHSP21", "BLK_NHSP21","HSP_POP21", "ASN_NHSP21", "AIA_NHSP21", "HPI_NHSP21", "OTH_NHSP21",
             "G20PRERTRU", "G20PREDBID", "G20PRELJOR", "G20PREGHAW", "G20PREOWRI"]

precinct_to_district_assignment = maup.assign(precincts, districts)
# Add the assigned districts as a column of the `precincts` GeoDataFrame:

districts[variables] = precincts[variables].groupby(precinct_to_district_assignment).sum()

#put it into new geojson fiele now
districts.to_file("texasAggDistrict.geojson", driver='GeoJSON')

districts_with_nan = districts[variables].isnull().any(axis=1) #count the Nan
nan_districts_count = districts_with_nan.sum() 
total_districts = len(districts)
nan_percentage = (nan_districts_count / total_districts ) * 100

print(f"Number of districts with NaN values in any variable: {nan_districts_count}")
print(f"Percentage of districts with NaN values: {nan_percentage:.2f}%")

print(districts[variables].head())