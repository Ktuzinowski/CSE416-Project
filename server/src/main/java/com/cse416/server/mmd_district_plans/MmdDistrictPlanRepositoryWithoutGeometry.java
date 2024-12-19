package com.cse416.server.mmd_district_plans;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MmdDistrictPlanRepositoryWithoutGeometry extends MongoRepository<FeatureCollectionWithoutGeometry, String> {
	@Cacheable(value = "featuresWithoutGeometryMmdDistrictPlan", key="#name")
	FeatureCollectionWithoutGeometry findByName(String name);
}
