package com.cse416.server.geojson.precincts;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precincts")
public class FeatureCollection {
	@Id
	private String id;
	
	private String type;
	private String name;
	private Integer zoom;
	private Integer minZoom;
	private Double[] center;
	
	@Field("features")
	private List<Feature> features;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Feature> getFeatures() {
		return features;
	}

	public void setFeatures(List<Feature> features) {
		this.features = features;
	}
	
	public Integer getZoom() {
		return zoom;
	}
	
	public void setZoom(Integer zoom) {
		this.zoom = zoom;
	}
	
	public Integer getMinZoom() {
		return minZoom;
	}
	
	public void setMinZoom(Integer minZoom) {
		this.minZoom = minZoom;
	}
	
	public Double[] getCenter() {
	    return center;
	}

	public void setCenter(Double[] center) {
	    if (center == null || center.length != 2) {
	        throw new IllegalArgumentException("Center must be an array of exactly two doubles.");
	    }
	    this.center = center;
	}
}
