package com.cse416.server.mmd_district_plans;

import java.util.List;

public class ElectionData {
	private List<Object> elected;
	private List<Object> losers;
	public List<Object> getElected() {
		return elected;
	}
	public void setElected(List<Object> elected) {
		this.elected = elected;
	}
	public List<Object> getLosers() {
		return losers;
	}
	public void setLosers(List<Object> losers) {
		this.losers = losers;
	}
}
