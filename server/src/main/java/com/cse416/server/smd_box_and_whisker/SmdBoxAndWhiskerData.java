package com.cse416.server.smd_box_and_whisker;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "smd_box_and_whisker")
public class SmdBoxAndWhiskerData {
	@Id
	private String id;
	private String state;
	private ComparisonBasis comparison_basis;
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
