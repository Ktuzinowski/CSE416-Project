package com.cse416.server.geojson.precincts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrecinctService {
	@Autowired 
	private PrecinctRepository precinctRepository;
	
	public FeatureCollection getStateByName(String name) {
		return precinctRepository.findByName(name);
	}
}
