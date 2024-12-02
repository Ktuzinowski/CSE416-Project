package com.cse416.server.smd_box_and_whisker;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "smd_box_and_whisker")
public class SmdBoxAndWhisker {
	@Id
	private String id;
	private String state;
	private ComparisonBasis comparison_basis;
	@Field("current_districts")
	private List<DistrictValue> current_districts;
	public List<DistrictValue> getCurrent_districts() {
		return current_districts;
	}
	public void setCurrent_districts(List<DistrictValue> current_districts) {
		this.current_districts = current_districts;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public ComparisonBasis getComparisonBasis() {
		return comparison_basis;
	}
	public void setComparisonBasis(ComparisonBasis comparisonBasis) {
		this.comparison_basis = comparisonBasis;
	}
}
