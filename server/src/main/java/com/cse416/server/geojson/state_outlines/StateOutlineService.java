package com.cse416.server.geojson.state_outlines;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateOutlineService {
	@Autowired
	private StateOutlineRepository districtOutlineRepository;
	
	public List<Feature> getAllDistrictOutlines() {
		return districtOutlineRepository.findAll();
	}
}
