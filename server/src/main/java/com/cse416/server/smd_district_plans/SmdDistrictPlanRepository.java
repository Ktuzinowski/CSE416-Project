package com.cse416.server.smd_district_plans;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SmdDistrictPlanRepository extends MongoRepository<FeatureCollection, String> {
	@Cacheable(value = "smdDistrictPlan", key="#name")
	FeatureCollection findByName(String name);
	
	@Cacheable(value = "smdDistrictPlanSummaries", key="#prefix")
	List<FeatureCollectionSummary> findByNameStartingWithIgnoreCase(String prefix);
}
