package com.cse416.server.smd_district_plans;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SmdDistrictPlanController {
	@Autowired
	public SmdDistrictPlanService service;
	
	@GetMapping("/smd_district_plans")
	public FeatureCollection getSmdDistrictPlan(@RequestParam("name") String name) {
		return service.getDistrictPlanByName(name);
	}
	
	@GetMapping("/smd_district_plans/summary")
	public List<FeatureCollectionSummary> getSmdDistrictPlanSummaries(@RequestParam("state") String state) {
		return service.getSummariesByState(state);
	}
}
