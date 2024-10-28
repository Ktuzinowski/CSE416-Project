import geopandas
import maup
import pandas

# yang used this to aggregate the precincts into the Districts, which now have the racial demographics and election data.

precincts = geopandas.read_file("src/arizona_data/ArizonaAggPrecinct.geojson").to_crs(26913)
districts = geopandas.read_file("src/arizona_data/arizona_congressional_plan.geojson").to_crs(26913)

#white, blk, hispanic, asian, native, pacific, other
#trump biden, Jo Jorgensen, Howie Hawkins
variables = ["CVAP_TOT20", "CVAP_WHT20", "CVAP_BLK20","CVAP_HSP20", "CVAP_ASN20", "CVAP_AIA20", "CVAP_NHP20",
             "G20PRERTRU", "G20PREDBID", "G20PRELJOR"]

precinct_to_district_assignment = maup.assign(precincts, districts)
# Add the assigned districts as a column of the `precincts` GeoDataFrame:

districts[variables] = precincts[variables].groupby(precinct_to_district_assignment).sum()

#put it into new geojson file now
districts.to_file("ArizonaAggDistrict.geojson", driver='GeoJSON')

districts_with_nan = districts[variables].isnull().any(axis=1) #count the Nan
nan_districts_count = districts_with_nan.sum() 
total_districts = len(districts)
nan_percentage = (nan_districts_count / total_districts ) * 100

print(f"Number of districts with NaN values in any variable: {nan_districts_count}")
print(f"Percentage of districts with NaN values: {nan_percentage:.2f}%")

print(districts[variables].head())