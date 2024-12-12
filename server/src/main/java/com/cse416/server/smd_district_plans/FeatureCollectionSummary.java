package com.cse416.server.smd_district_plans;

public interface FeatureCollectionSummary {
	String getId();
	String getName();
	
	Integer getSmd_id();
	String getInteresting_description();
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
