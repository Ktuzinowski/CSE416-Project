package com.cse416.server.mmd_box_and_whisker;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MmdBoxAndWhiskerRepository extends MongoRepository<MmdBoxAndWhisker, String> {
	@Cacheable(value = "mmdBoxAndWhisker", key="#state")
	MmdBoxAndWhisker findByState(String state);
}