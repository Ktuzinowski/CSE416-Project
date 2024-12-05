package com.cse416.server.smd_box_and_whisker;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SmdBoxAndWhiskerRepository extends MongoRepository<SmdBoxAndWhiskerData, String> {
	@Cacheable(value = "smdBoxAndWhisker", key="#state")
	SmdBoxAndWhiskerData findByState(String state);
}
