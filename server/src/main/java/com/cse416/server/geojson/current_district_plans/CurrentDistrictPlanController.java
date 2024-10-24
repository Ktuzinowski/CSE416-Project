package com.cse416.server.geojson.current_district_plans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CurrentDistrictPlanController {
	@Autowired
	public CurrentDistrictPlanService currentDistrictPlanService;
	
	@GetMapping("/current_district_plan/{state}")
	public FeatureCollection getPrecinctData(@PathVariable("state") String state) {
		FeatureCollection currentDistrictPlanData = currentDistrictPlanService.getStateByName(state);
		return currentDistrictPlanData;
	}
}