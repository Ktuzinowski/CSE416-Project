package com.cse416.server.mmd_ensemble_summary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MmdEnsembleSummaryController {
	@Autowired
	public MmdEnsembleSummaryService service;
	
	@GetMapping("/ensemble/summary/mmd")
	public MmdEnsembleSummary getMmdEnsembleSummaryData(@RequestParam("state") String state) {
		MmdEnsembleSummary summaryData = service.getByState(state);
		return summaryData;
	}
}
