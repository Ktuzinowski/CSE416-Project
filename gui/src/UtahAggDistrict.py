import geopandas
import maup
import pandas

precincts = geopandas.read_file("src/utah_data/aggregated_precincts.geojson").to_crs(26912)
districts = geopandas.read_file("src/utah_data/utah_congressional_plan.geojson").to_crs(26912)

variables = ["PP_TOTAL", "PP_WHTALN", "G20PRERTRU", "G20PREDBID", "PP_ASNALN", "PP_HPIALN", "PP_HISPLAT", "PP_OTHALN", "PP_BAAALN"]

precinct_to_district_assignment = maup.assign(precincts, districts)
# Add the assigned districts as a column of the `precincts` GeoDataFrame:

districts[variables] = precincts[variables].groupby(precinct_to_district_assignment).sum()

#put it into new geojson fiele now
#districts.to_file("aggregated_districts.geojson", driver='GeoJSON')

print(districts[variables].head())