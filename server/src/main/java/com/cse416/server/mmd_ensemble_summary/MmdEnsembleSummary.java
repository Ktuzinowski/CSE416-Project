package com.cse416.server.mmd_ensemble_summary;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mmd_ensemble_summary")
public class MmdEnsembleSummary {
	@Id
	private String id;
	private String state;
	private int number_of_plans;
	private double minority_representatives;
	private List<Double> average_republican_democratic_split;
	private Map<String, Double>  republican_democratic_split_frequency;
	private double average_republican_representatives;
	private double average_democratic_representatives;
	private double republican_seat_share;
	private double democratic_seat_share;
	private double population_deviation;
	private double republican_vote_share;
	private double democratic_vote_share;
	private Map<String, Double> range_of_opportunity_representatives;
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
	public int getNumber_of_plans() {
		return number_of_plans;
	}
	public void setNumber_of_plans(int number_of_plans) {
		this.number_of_plans = number_of_plans;
	}
	public double getMinority_representatives() {
		return minority_representatives;
	}
	public void setMinority_representatives(double minority_representatives) {
		this.minority_representatives = minority_representatives;
	}
	public List<Double> getAverage_republican_democratic_split() {
		return average_republican_democratic_split;
	}
	public void setAverage_republican_democratic_split(List<Double> average_republican_democratic_split) {
		this.average_republican_democratic_split = average_republican_democratic_split;
	}
	public Map<String, Double> getRepublican_democratic_split_frequency() {
		return republican_democratic_split_frequency;
	}
	public void setRepublican_democratic_split_frequency(Map<String, Double> republican_democratic_split_frequency) {
		this.republican_democratic_split_frequency = republican_democratic_split_frequency;
	}
	public double getAverage_republican_representatives() {
		return average_republican_representatives;
	}
	public void setAverage_republican_representatives(double average_republican_representatives) {
		this.average_republican_representatives = average_republican_representatives;
	}
	public double getAverage_democratic_representatives() {
		return average_democratic_representatives;
	}
	public void setAverage_democratic_representatives(double average_democratic_representatives) {
		this.average_democratic_representatives = average_democratic_representatives;
	}
	public double getRepublican_seat_share() {
		return republican_seat_share;
	}
	public void setRepublican_seat_share(double republican_seat_share) {
		this.republican_seat_share = republican_seat_share;
	}
	public double getDemocratic_seat_share() {
		return democratic_seat_share;
	}
	public void setDemocratic_seat_share(double democratic_seat_share) {
		this.democratic_seat_share = democratic_seat_share;
	}
	public double getPopulation_deviation() {
		return population_deviation;
	}
	public void setPopulation_deviation(double population_deviation) {
		this.population_deviation = population_deviation;
	}
	public double getRepublican_vote_share() {
		return republican_vote_share;
	}
	public void setRepublican_vote_share(double republican_vote_share) {
		this.republican_vote_share = republican_vote_share;
	}
	public double getDemocratic_vote_share() {
		return democratic_vote_share;
	}
	public void setDemocratic_vote_share(double democratic_vote_share) {
		this.democratic_vote_share = democratic_vote_share;
	}
	public Map<String, Double> getRange_of_opportunity_representatives() {
		return range_of_opportunity_representatives;
	}
	public void setRange_of_opportunity_representatives(Map<String, Double> range_of_opportunity_representatives) {
		this.range_of_opportunity_representatives = range_of_opportunity_representatives;
	}
	public List<Integer> getMmd_layout() {
		return mmd_layout;
	}
	public void setMmd_layout(List<Integer> mmd_layout) {
		this.mmd_layout = mmd_layout;
	}
}
