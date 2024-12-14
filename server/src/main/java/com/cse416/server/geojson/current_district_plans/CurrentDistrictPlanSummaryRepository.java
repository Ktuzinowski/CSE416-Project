package com.cse416.server.geojson.current_district_plans;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrentDistrictPlanSummaryRepository extends MongoRepository<FeatureCollection, String> {
	@Cacheable(value = "currentDistrictPlanSummaries", key="#name")
	CurrentDistrictPlanSummary findByName(String name);
}
