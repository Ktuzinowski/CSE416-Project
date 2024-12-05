package com.cse416.server.smd_box_and_whisker;

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

        private final String value;

        ComparisonGroup(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
    
	public BOC getByStateAndBOC(String name, String boc) {
		SmdBoxAndWhisker smdBoxAndWhisker =  smdBoxAndWhiskerRepository.findByState(name);
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