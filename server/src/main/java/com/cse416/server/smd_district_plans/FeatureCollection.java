package com.cse416.server.smd_district_plans;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "smd_district_plans")
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
	
	private Integer smd_id;
	private String interesting_description;
	private Double republican_democratic_split;
	private Double opportunity_district_threshold;
	private Double safe_district_threshold;
	private Integer opportunity_districts;
	private Integer safe_districts_republican;
	private Integer safe_districts_democratic;
	private Integer number_of_districts;
	private Integer wasted_votes_republican;
	private Integer wasted_votes_democratic;
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
		this.center = center;
	}
	public List<Feature> getFeatures() {
		return features;
	}
	public void setFeatures(List<Feature> features) {
		this.features = features;
	}
	public Integer getSmd_id() {
		return smd_id;
	}
	public void setSmd_id(Integer smd_id) {
		this.smd_id = smd_id;
	}
	public String getInteresting_description() {
		return interesting_description;
	}
	public void setInteresting_description(String interesting_description) {
		this.interesting_description = interesting_description;
	}
	public Double getRepublican_democratic_split() {
		return republican_democratic_split;
	}
	public void setRepublican_democratic_split(Double republican_democratic_split) {
		this.republican_democratic_split = republican_democratic_split;
	}
	public Double getOpportunity_district_threshold() {
		return opportunity_district_threshold;
	}
	public void setOpportunity_district_threshold(Double opportunity_district_threshold) {
		this.opportunity_district_threshold = opportunity_district_threshold;
	}
	public Double getSafe_district_threshold() {
		return safe_district_threshold;
	}
	public void setSafe_district_threshold(Double safe_district_threshold) {
		this.safe_district_threshold = safe_district_threshold;
	}
	public Integer getOpportunity_districts() {
		return opportunity_districts;
	}
	public void setOpportunity_districts(Integer opportunity_districts) {
		this.opportunity_districts = opportunity_districts;
	}
	public Integer getSafe_districts_republican() {
		return safe_districts_republican;
	}
	public void setSafe_districts_republican(Integer safe_districts_republican) {
		this.safe_districts_republican = safe_districts_republican;
	}
	public Integer getSafe_districts_democratic() {
		return safe_districts_democratic;
	}
	public void setSafe_districts_democratic(Integer safe_districts_democratic) {
		this.safe_districts_democratic = safe_districts_democratic;
	}
	public Integer getNumber_of_districts() {
		return number_of_districts;
	}
	public void setNumber_of_districts(Integer number_of_districts) {
		this.number_of_districts = number_of_districts;
	}
	public Integer getWasted_votes_republican() {
		return wasted_votes_republican;
	}
	public void setWasted_votes_republican(Integer wasted_votes_republican) {
		this.wasted_votes_republican = wasted_votes_republican;
	}
	public Integer getWasted_votes_democratic() {
		return wasted_votes_democratic;
	}
	public void setWasted_votes_democratic(Integer wasted_votes_democratic) {
		this.wasted_votes_democratic = wasted_votes_democratic;
	}
}
