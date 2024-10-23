package com.cse416.server.geojson.state_outlines;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cse416.server.geojson.Feature;
import com.cse416.server.geojson.FeatureCollection;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StateOutlineController {
	
	@Autowired
	public StateOutlineService districtOutlineService;
	
	@GetMapping("/state_outlines")
	public FeatureCollection getDistrictOutlines() {
		// Return GeoJSON data to the client
		List<Feature> features = districtOutlineService.getAllDistrictOutlines();
		
		FeatureCollection featureCollection = new FeatureCollection();
		featureCollection.setType("FeatureCollection");
		featureCollection.setFeatures(features);
		
		return featureCollection;
	}
}
