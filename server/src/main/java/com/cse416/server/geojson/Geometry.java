package com.cse416.server.geojson;

import java.util.List;

public class Geometry {
	private String type; // e.g., "Polygon", "MultiPolygon", "Point", etc.
	
	private List<Object> coordinates;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Object> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<Object> coordinates) {
		this.coordinates = coordinates;
	}
}
