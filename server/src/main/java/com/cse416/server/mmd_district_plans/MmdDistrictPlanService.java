package com.cse416.server.mmd_district_plans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MmdDistrictPlanService {
	@Autowired
	private MmdDistrictPlanRepository repository;
	
	public FeatureCollection getDistrictPlanByName(String name) {
		return repository.findByName(name);
	}
}
