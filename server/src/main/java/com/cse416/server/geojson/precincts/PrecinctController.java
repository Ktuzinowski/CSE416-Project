package com.cse416.server.geojson.precincts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PrecinctController {
	@Autowired
	public PrecinctService precinctService;
	
	@GetMapping("/precincts/{state}")
	public FeatureCollection getPrecinctData(@PathVariable("state") String state) {
		FeatureCollection precinctsData = precinctService.getStateByName(state);
		return precinctsData;
	}
}
