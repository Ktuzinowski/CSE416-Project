package com.cse416.server.smd_district_plans;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SmdDistrictPlanRepositoryWithoutGeometry extends MongoRepository<FeatureCollectionWithoutGeometry, String> {
	@Cacheable(value = "featuresWithoutGeometrySmdDistrictPlan", key="#name")
	FeatureCollectionWithoutGeometry findByName(String name);
}
