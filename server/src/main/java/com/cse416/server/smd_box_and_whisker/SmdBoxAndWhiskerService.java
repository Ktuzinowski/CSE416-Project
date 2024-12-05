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
        HISPANIC("hispanic");

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
    
	public BOC getByStateAndBOC(String name, String boc) {
		SmdBoxAndWhisker smdBoxAndWhisker =  smdBoxAndWhiskerRepository.findByState(name);
		System.out.println(smdBoxAndWhisker.getComparisonBasis().getDemocrat().getCurrent_districts());
		return this.getBOC(smdBoxAndWhisker, boc);
	}
	
	public BOC getBOC(SmdBoxAndWhisker smdBoxAndWhisker, String boc) {
		if (ComparisonGroup.DEMOCRAT.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getDemocrat();
		}
		else if (ComparisonGroup.REPUBLICAN.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getRepublican();
		}
		else if (ComparisonGroup.WHITE.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getWhite();
		}
		else if (ComparisonGroup.BLACK.getValue().equalsIgnoreCase(boc)) {
			return smdBoxAndWhisker.getComparisonBasis().getBlack();
		}
		else {
			return smdBoxAndWhisker.getComparisonBasis().getHispanic();
		}
	}
}