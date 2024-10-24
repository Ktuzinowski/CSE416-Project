package com.cse416.server.geojson.state_outlines;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateOutlineRepository extends MongoRepository<Feature, String> {
	List<Feature> findAll();
}
