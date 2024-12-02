package com.cse416.server.mmd_box_and_whisker;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MmdBoxAndWhiskerService {
	@Autowired
	private MmdBoxAndWhiskerRepository mmdBoxAndWhiskerRepository;
	
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
	
	public List<Map<String, List<BoxAndWhisker>>> getBinsForBOC(MmdBoxAndWhisker mmdBoxAndWhisker, String boc) {
		if (ComparisonGroup.DEMOCRAT.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getDemocrat().getBins();
		}
		else if (ComparisonGroup.REPUBLICAN.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getRepublican().getBins();
		}
		else if (ComparisonGroup.WHITE.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getWhite().getBins();
		}
		else if (ComparisonGroup.BLACK.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getBlack().getBins();
		}
		else if (ComparisonGroup.HISPANIC.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getHispanic().getBins();
		}
		else if (ComparisonGroup.PACIFIC.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getPacific().getBins();
		}
		else if (ComparisonGroup.INDIGENOUS.getValue().equalsIgnoreCase(boc)) {
			return mmdBoxAndWhisker.getComparison_basis().getIndigenous().getBins();
		}
		else {
			return mmdBoxAndWhisker.getComparison_basis().getOther().getBins();
		}
	}
	
	public MmdBoxAndWhiskerPlotData getByStateAndBOC(String name, String boc) {
		MmdBoxAndWhisker mmdBoxAndWhisker = mmdBoxAndWhiskerRepository.findByState(name);
		List<Map<String, List<BoxAndWhisker>>> bins = this.getBinsForBOC(mmdBoxAndWhisker, boc);
		MmdBoxAndWhiskerPlotData mmdBoxAndWhiskerPlotData = new MmdBoxAndWhiskerPlotData();
		mmdBoxAndWhiskerPlotData.setState(name);
		mmdBoxAndWhiskerPlotData.setBins(bins);
		return mmdBoxAndWhiskerPlotData;
	}
}
