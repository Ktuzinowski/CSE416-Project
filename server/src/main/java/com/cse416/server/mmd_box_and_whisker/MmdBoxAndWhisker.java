package com.cse416.server.mmd_box_and_whisker;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mmd_box_and_whisker")
public class MmdBoxAndWhisker {
	@Id
	private String id;
	private String state;
	private ComparisonBasisMmdData comparison_basis;
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
	public ComparisonBasisMmdData getComparison_basis() {
		return comparison_basis;
	}
	public void setComparison_basis(ComparisonBasisMmdData comparison_basis) {
		this.comparison_basis = comparison_basis;
	}
}
