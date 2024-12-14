package com.cse416.server.geojson.current_district_plans;

public interface CurrentDistrictPlanSummary {
	Double getRepublican_democratic_split();
	Double getOpportunity_district_threshold();
	Double getSafe_district_threshold();
	Integer getOpportunity_districts();
	Integer getSafe_districts_republican();
	Integer getSafe_districts_democratic();
	Integer getNumber_of_districts();
	Integer getWasted_votes_republican();
	Integer getWasted_votes_democratic();
}