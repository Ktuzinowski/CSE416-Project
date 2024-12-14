package com.cse416.server.geojson.current_district_plans;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrentDistrictPlanRepository extends MongoRepository<FeatureCollection, String> {
	FeatureCollection findByName(String name);
}
