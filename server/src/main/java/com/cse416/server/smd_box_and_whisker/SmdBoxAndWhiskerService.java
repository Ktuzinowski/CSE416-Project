package com.cse416.server.smd_box_and_whisker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmdBoxAndWhiskerService {
	@Autowired
	private SmdBoxAndWhiskerRepository smdBoxAndWhiskerRepository;
	
    public enum ComparisonGroup {
        DEMOCRAT("democrat"),
        REPUBLICAN("republican"),
        WHITE("white"),
        BLACK("black"),
        HISPANIC("hispanic"),
        PACIFIC("pacific"),
        INDIGENOUS("indigenous"),
        OTHER("other");

        // Field to store the string value
        private final String value;

        // Constructor to initialize the string value
        ComparisonGroup(String value) {
            this.value = value;
        }

        // Method to retrieve the string value
        public String getValue() {
            return value;
        }

        // Static method to check for equality with a string
        public static ComparisonGroup fromString(String str) {
            for (ComparisonGroup group : ComparisonGroup.values()) {
                if (group.value.equalsIgnoreCase(str)) {
                    return group;
                }
            }
            throw new IllegalArgumentException("No enum constant with value: " + str);
        }
    }
	
	public List<Bin> getBinsForBOC(SmdBoxAndWhisker smdBoxAndWhisker, String boc) {
		if (ComparisonGroup.DEMOCRAT.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getDemocrat().getBins();
		}
		else if (ComparisonGroup.REPUBLICAN.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getRepublican().getBins();
		}
		else if (ComparisonGroup.WHITE.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getWhite().getBins();
		}
		else if (ComparisonGroup.BLACK.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getBlack().getBins();
		}
		else if (ComparisonGroup.HISPANIC.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getHispanic().getBins();
		}
		else if (ComparisonGroup.PACIFIC.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getPacific().getBins();
		}
		else if (ComparisonGroup.INDIGENOUS.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getIndigenous().getBins();
		}
		else {
			return smdBoxAndWhisker.getComparisonBasis().getOther().getBins();
		}
	}
	
	public SmdBoxAndWhiskerPlotData getByStateAndBOC(String name, String boc) {
		SmdBoxAndWhisker smdBoxAndWhisker =  smdBoxAndWhiskerRepository.findByState(name);
		List<Bin> bins = this.getBinsForBOC(smdBoxAndWhisker, boc);
		SmdBoxAndWhiskerPlotData smdBoxAndWhiskerPlotData = new SmdBoxAndWhiskerPlotData();
		smdBoxAndWhiskerPlotData.setState(name);
		smdBoxAndWhiskerPlotData.setBins(bins);
		smdBoxAndWhiskerPlotData.setCurrent_districts(smdBoxAndWhisker.getCurrent_districts());
		return smdBoxAndWhiskerPlotData;
	}
	
}