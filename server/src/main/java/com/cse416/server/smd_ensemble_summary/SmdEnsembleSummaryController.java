package com.cse416.server.smd_ensemble_summary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SmdEnsembleSummaryController {
	@Autowired
	public SmdEnsembleSummaryService service;
	
	@GetMapping("/ensemble/summary/smd")
	public SmdEnsembleSummary getSmdEnsembleSummaryData(@RequestParam("state") String state) {
		SmdEnsembleSummary summaryData = service.getByState(state);
		return summaryData;
	}
}
