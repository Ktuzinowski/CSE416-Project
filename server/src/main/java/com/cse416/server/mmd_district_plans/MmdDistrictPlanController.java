package com.cse416.server.mmd_district_plans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MmdDistrictPlanController {
	@Autowired
	public MmdDistrictPlanService service;
	
	@GetMapping("/mmd_district_plans")
	public FeatureCollection getMmdDistrictPlan(@RequestParam("name") String name) {
		return service.getDistrictPlanByName(name);
	}
}
