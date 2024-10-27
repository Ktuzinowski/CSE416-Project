package com.cse416.server.geojson.precincts;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrecinctRepository extends MongoRepository<FeatureCollection, String> {
	FeatureCollection findByName(String name);
}
