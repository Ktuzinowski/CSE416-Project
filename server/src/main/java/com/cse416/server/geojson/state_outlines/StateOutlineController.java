package com.cse416.server.geojson.state_outlines;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StateOutlineController {
	
	@Autowired
	public StateOutlineService stateOutlineService;
	
	@GetMapping("/state_outlines")
	public FeatureCollection getStateOutlines() {
		// Return GeoJSON data to the client
		List<Feature> features = stateOutlineService.getAllStateOutlines();
		
		FeatureCollection featureCollection = new FeatureCollection();
		featureCollection.setType("FeatureCollection");
		
		featureCollection.setFeatures(features);
		
		return featureCollection;
	}
}
