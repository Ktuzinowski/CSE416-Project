import geopandas
import maup
import pandas

precincts = geopandas.read_file("src/utah_data/aggregated_pre.geojson").to_crs(26912)
districts = geopandas.read_file("src/utah_data/utah_congressional_plan.geojson").to_crs(26912)

variables = ["PP_TOTAL", "G20PRERTRU", "G20PREDBID","PP_WHTALN", "PP_BAAALN", "PP_ASNALN", "PP_HISPLAT", "PP_HPIALN", "PP_NAMALN", "PP_OTHALN"]

precinct_to_district_assignment = maup.assign(precincts, districts)
# Add the assigned districts as a column of the `precincts` GeoDataFrame:

districts[variables] = precincts[variables].groupby(precinct_to_district_assignment).sum()

#put it into new geojson fiele now
# districts.to_file("aggregated_districts.geojson", driver='GeoJSON')

districts_with_nan = districts[variables].isnull().any(axis=1) #count the Nan
nan_districts_count = districts_with_nan.sum() 
total_districts = len(districts)
nan_percentage = (nan_districts_count / total_districts ) * 100

print(f"Number of districts with NaN values in any variable: {nan_districts_count}")
print(f"Percentage of districts with NaN values: {nan_percentage:.2f}%")

print(districts[variables].head())