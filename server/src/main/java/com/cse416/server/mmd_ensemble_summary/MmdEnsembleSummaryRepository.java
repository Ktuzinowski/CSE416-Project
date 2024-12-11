package com.cse416.server.mmd_ensemble_summary;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MmdEnsembleSummaryRepository extends MongoRepository<MmdEnsembleSummary, String> {
	@Cacheable(value = "mmdEnsembleSummary", key="#state")
	MmdEnsembleSummary findByState(String state);
}
