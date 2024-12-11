package com.cse416.server.smd_ensemble_summary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmdEnsembleSummaryService {
	@Autowired
	private SmdEnsembleSummaryRepository repository;
	
	public SmdEnsembleSummary getByState(String state) {
		return repository.findByState(state);
	}
}
