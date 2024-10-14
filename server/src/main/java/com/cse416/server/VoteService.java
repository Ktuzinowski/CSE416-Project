package com.cse416.server;

import org.springframework.stereotype.Service;

@Service
public class VoteService {

    // Assume this method connects to a database or external source to fetch vote data
    public VotePercentageResponse calculateVotePercentage(Long districtId) {
        int republicanVotes = 0; // Example count for Republicans
        int democratVotes = 0; // Example count for Democrats
    	if (districtId == 1) {
    		republicanVotes = 216472;
    		democratVotes = 142602;
    	}
    	else if (districtId == 2) {
    		republicanVotes = 205109;
    		democratVotes = 143368;
    	}
    	else if (districtId == 3) {
    		republicanVotes = 225446;
    		democratVotes = 149221;
    	}
    	else if (districtId == 4) {
    		republicanVotes = 218113;
    		democratVotes = 125091;
    	}
        int totalVotes = (865140 + 560282);


        double republicanPercentage = (republicanVotes / (double) totalVotes);
        double democratPercentage = (democratVotes / (double) totalVotes);

        return new VotePercentageResponse(republicanPercentage, democratPercentage);
    }
}
