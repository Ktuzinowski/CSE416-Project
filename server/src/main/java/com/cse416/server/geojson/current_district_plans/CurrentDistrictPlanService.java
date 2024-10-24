package com.cse416.server.geojson.current_district_plans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurrentDistrictPlanService {
	@Autowired 
	private CurrentDistrictPlanRepository currentDistrictPlanRepository;
	
	public FeatureCollection getStateByName(String name) {
		return currentDistrictPlanRepository.findByName(name);
	}
}
