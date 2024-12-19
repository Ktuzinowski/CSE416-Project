package com.cse416.server.mmd_district_plans;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MmdDistrictPlanRepository extends MongoRepository<FeatureCollection, String> {
	@Cacheable(value = "mmdDistrictPlan", key="#name")
	FeatureCollection findByName(String name);
	
	@Cacheable(value = "mmdDistrictPlanSummaries", key="#prefix")
	List<FeatureCollectionSummary> findByNameStartingWithIgnoreCase(String prefix);
}
