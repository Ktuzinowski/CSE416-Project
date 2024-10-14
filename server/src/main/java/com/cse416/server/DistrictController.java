package com.cse416.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DistrictController {

    @Autowired
    private VoteService voteService;
    
    @GetMapping("/districts/{id_for_district}/votes")
    public ResponseEntity<VotePercentageResponse> getVotesPercentage(@PathVariable("id_for_district") Long districtId) {
        VotePercentageResponse response = voteService.calculateVotePercentage(districtId);
        return ResponseEntity.ok(response);
    }
}
