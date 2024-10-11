package com.cse416.server;

import org.springframework.stereotype.Service;

@Service
public class VoteService {

    // Assume this method connects to a database or external source to fetch vote data
    public VotePercentageResponse calculateVotePercentage(Long districtId) {
        int totalVotes = 1000; // Example total vote count
        int republicanVotes = 600; // Example count for Republicans
        int democratVotes = 400; // Example count for Democrats

        double republicanPercentage = (republicanVotes / (double) totalVotes) * 100;
        double democratPercentage = (democratVotes / (double) totalVotes) * 100;

        return new VotePercentageResponse(republicanPercentage, democratPercentage);
    }
}
