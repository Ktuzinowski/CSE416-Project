package com.cse416.server.mmd_ensemble_summary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MmdEnsembleSummaryService {
	@Autowired
	private MmdEnsembleSummaryRepository repository;
	
	public MmdEnsembleSummary getByState(String state) {
		return repository.findByState(state);
	}
}
