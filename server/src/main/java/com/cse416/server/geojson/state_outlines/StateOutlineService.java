package com.cse416.server.geojson.state_outlines;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class StateOutlineService {
	@Autowired
	private StateOutlineRepository stateOutlineRepository;
	
	@Cacheable(value = "state_outlines")
	public List<Feature> getAllStateOutlines() {
		return stateOutlineRepository.findAll();
	}
}
