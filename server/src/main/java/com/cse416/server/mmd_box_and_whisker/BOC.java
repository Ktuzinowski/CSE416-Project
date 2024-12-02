package com.cse416.server.mmd_box_and_whisker;

import java.util.List;
import java.util.Map;

public class BOC {
	private List<Map<String, List<BoxAndWhisker>>> bins;
	public List<Map<String, List<BoxAndWhisker>>> getBins() {
		return bins;
	}
	public void setBins(List<Map<String, List<BoxAndWhisker>>> bins) {
		this.bins = bins;
	}
}
