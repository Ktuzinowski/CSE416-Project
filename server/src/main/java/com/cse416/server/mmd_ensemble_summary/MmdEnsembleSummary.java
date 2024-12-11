package com.cse416.server.mmd_ensemble_summary;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mmd_ensemble_summary")
public class MmdEnsembleSummary {
	@Id
	private String id;
	private String state;
	private int num_plans;
	private double minority_reps;
	private double rep_share;
	private double dem_share;
	private double pop_dev;
	private List<Integer> mmd_layout;
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
	public int getNum_plans() {
		return num_plans;
	}
	public void setNum_plans(int num_plans) {
		this.num_plans = num_plans;
	}
	public double getMinority_reps() {
		return minority_reps;
	}
	public void setMinority_reps(double minority_reps) {
		this.minority_reps = minority_reps;
	}
	public double getRep_share() {
		return rep_share;
	}
	public void setRep_share(double rep_share) {
		this.rep_share = rep_share;
	}
	public double getDem_share() {
		return dem_share;
	}
	public void setDem_share(double dem_share) {
		this.dem_share = dem_share;
	}
	public double getPop_dev() {
		return pop_dev;
	}
	public void setPop_dev(double pop_dev) {
		this.pop_dev = pop_dev;
	}
	public List<Integer> getMmd_layout() {
		return mmd_layout;
	}
	public void setMmd_layout(List<Integer> mmd_layout) {
		this.mmd_layout = mmd_layout;
	}
}
