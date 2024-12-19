package com.cse416.server.mmd_district_plans;

public interface FeatureCollectionSummary {
	String getId();
	String getName();
	
	Integer getMmd_id();
	String getInteresting_description();
	Double getRepublican_democratic_split();
	Double getOpportunity_district_threshold();
	Integer getOpportunity_representatives();
	Integer getNumber_of_districts();
	Integer getWasted_votes_republican();
	Integer getWasted_votes_democratic();
}