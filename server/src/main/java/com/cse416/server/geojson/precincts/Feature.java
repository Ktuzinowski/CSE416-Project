package com.cse416.server.geojson.precincts;

import org.springframework.data.mongodb.core.mapping.Field;

import com.cse416.server.geojson.Geometry;

public class Feature {
	private String type;
	@Field("properties")
	private Properties properties;
	private Geometry geometry;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Properties getProperties() {
		return properties;
	}
	public void setProperties(Properties properties) {
		this.properties = properties;
	}
	public Geometry getGeometry() {
		return geometry;
	}
	public void setGeometry(Geometry geometry) {
		this.geometry = geometry;
	}
}
