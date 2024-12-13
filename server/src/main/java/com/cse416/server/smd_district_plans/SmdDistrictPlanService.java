package com.cse416.server.smd_district_plans;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmdDistrictPlanService {
	@Autowired
	private SmdDistrictPlanRepository repository;
	
	public FeatureCollection getDistrictPlanByName(String name) {
		return repository.findByName(name);
	}
	
	public List<FeatureCollectionSummary> getSummariesByState(String state) {
		return repository.findByNameStartingWithIgnoreCase(state);
	}
}