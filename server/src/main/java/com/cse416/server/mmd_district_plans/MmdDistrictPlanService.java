package com.cse416.server.mmd_district_plans;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MmdDistrictPlanService {
	@Autowired
	private MmdDistrictPlanRepository repository;
	@Autowired
	private MmdDistrictPlanRepositoryWithoutGeometry repositoryNoGeo;
	
	public FeatureCollection getDistrictPlanByName(String name) {
		return repository.findByName(name);
	}
	
	public List<FeatureCollectionSummary> getSummariesByState(String state) {
		return repository.findByNameStartingWithIgnoreCase(state);
	}
	
	public FeatureCollectionWithoutGeometry getSummaryForPlan(String name) {
		return repositoryNoGeo.findByName(name);
	}
}
