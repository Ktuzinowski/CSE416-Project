package com.cse416.server.smd_box_and_whisker;

import java.util.List;

public class SmdBoxAndWhiskerPlotData {
	private String state;
	List<Bin> bins;
	List<DistrictValue> current_districts;
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public List<Bin> getBins() {
		return bins;
	}
	public void setBins(List<Bin> bins) {
		this.bins = bins;
	}
	public List<DistrictValue> getCurrent_districts() {
		return current_districts;
	}
	public void setCurrent_districts(List<DistrictValue> currentDistricts) {
		this.current_districts = currentDistricts;
	}
}
