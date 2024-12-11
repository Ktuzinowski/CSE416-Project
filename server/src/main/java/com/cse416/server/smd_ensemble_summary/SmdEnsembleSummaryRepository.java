package com.cse416.server.smd_ensemble_summary;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SmdEnsembleSummaryRepository extends MongoRepository<SmdEnsembleSummary, String> {
	@Cacheable(value = "smdEnsembleSummary", key="#state")
	SmdEnsembleSummary findByState(String state);
}
