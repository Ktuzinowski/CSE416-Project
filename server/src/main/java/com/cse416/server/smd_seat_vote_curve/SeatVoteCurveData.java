package com.cse416.server.smd_seat_vote_curve;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "smd_seat_vote_share_plot")
public class SeatVoteCurveData {
	@Id
	private String id;
	private String name;
	private double partisan_bias;
	private double symmetry;
	private double responsiveness;
	private List<Integer> vote_share;
	private List<Integer> republican_seat_share;
	private List<Integer> democratic_seat_share;
	private double vote_share_republican;
	private double vote_share_democratic;
	private double seat_share_republican_smd;
	private double seat_share_democratic_smd;
	private double seat_share_republican_mmd;
	private double seat_share_democratic_mmd;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPartisan_bias() {
		return partisan_bias;
	}
	public void setPartisan_bias(double partisan_bias) {
		this.partisan_bias = partisan_bias;
	}
	public double getSymmetry() {
		return symmetry;
	}
	public void setSymmetry(double symmetry) {
		this.symmetry = symmetry;
	}
	public double getResponsiveness() {
		return responsiveness;
	}
	public void setResponsiveness(double responsiveness) {
		this.responsiveness = responsiveness;
	}
	public List<Integer> getVote_share() {
		return vote_share;
	}
	public void setVote_share(List<Integer> vote_share) {
		this.vote_share = vote_share;
	}
	public List<Integer> getRepublican_seat_share() {
		return republican_seat_share;
	}
	public void setRepublican_seat_share(List<Integer> republican_seat_share) {
		this.republican_seat_share = republican_seat_share;
	}
	public List<Integer> getDemocratic_seat_share() {
		return democratic_seat_share;
	}
	public void setDemocratic_seat_share(List<Integer> democratic_seat_share) {
		this.democratic_seat_share = democratic_seat_share;
	}
	public double getVote_share_republican() {
		return vote_share_republican;
	}
	public void setVote_share_republican(double vote_share_republican) {
		this.vote_share_republican = vote_share_republican;
	}
	public double getVote_share_democratic() {
		return vote_share_democratic;
	}
	public void setVote_share_democratic(double vote_share_democratic) {
		this.vote_share_democratic = vote_share_democratic;
	}
	public double getSeat_share_republican_smd() {
		return seat_share_republican_smd;
	}
	public void setSeat_share_republican_smd(double seat_share_republican_smd) {
		this.seat_share_republican_smd = seat_share_republican_smd;
	}
	public double getSeat_share_democratic_smd() {
		return seat_share_democratic_smd;
	}
	public void setSeat_share_democratic_smd(double seat_share_democratic_smd) {
		this.seat_share_democratic_smd = seat_share_democratic_smd;
	}
	public double getSeat_share_republican_mmd() {
		return seat_share_republican_mmd;
	}
	public void setSeat_share_republican_mmd(double seat_share_republican_mmd) {
		this.seat_share_republican_mmd = seat_share_republican_mmd;
	}
	public double getSeat_share_democratic_mmd() {
		return seat_share_democratic_mmd;
	}
	public void setSeat_share_democratic_mmd(double seat_share_democratic_mmd) {
		this.seat_share_democratic_mmd = seat_share_democratic_mmd;
	}
}
