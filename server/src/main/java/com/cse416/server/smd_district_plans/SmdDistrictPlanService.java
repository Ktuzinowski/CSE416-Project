package com.cse416.server.smd_district_plans;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmdDistrictPlanService {
	@Autowired
	private SmdDistrictPlanRepository repository;
	@Autowired
	private SmdDistrictPlanRepositoryWithoutGeometry repository_no_geometry;
	
	public FeatureCollection getDistrictPlanByName(String name) {
		return repository.findByName(name);
	}
	
	public List<FeatureCollectionSummary> getSummariesByState(String state) {
		return repository.findByNameStartingWithIgnoreCase(state);
	}
	
	public FeatureCollectionWithoutGeometry getDistrictsWithoutGeometry(String name) {
		return repository_no_geometry.findByName(name);
	}
}
