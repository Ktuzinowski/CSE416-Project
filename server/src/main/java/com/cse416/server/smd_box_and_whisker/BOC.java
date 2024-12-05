package com.cse416.server.smd_box_and_whisker;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

public class BOC {
	private List<Bin> bins;
	@Field("current_districts")
	private List<DistrictValue> current_districts;
	public List<Bin> getBins() {
		return bins;
	}
	public void setBins(List<Bin> bins) {
		this.bins = bins;
	}
	public List<DistrictValue> getCurrent_districts() {
		return current_districts;
	}
	public void setCurrent_districts(List<DistrictValue> current_districts) {
		this.current_districts = current_districts;
	}
}
