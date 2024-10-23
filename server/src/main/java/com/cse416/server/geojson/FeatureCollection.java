package com.cse416.server.geojson;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class FeatureCollection {
	private String type; // FeatureCollection
	
	@Field("features")
	private List<Feature> features;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Feature> getFeatures() {
		return features;
	}

	public void setFeatures(List<Feature> features) {
		this.features = features;
	}
}



