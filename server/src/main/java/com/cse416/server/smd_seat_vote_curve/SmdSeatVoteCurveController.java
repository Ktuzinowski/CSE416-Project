package com.cse416.server.smd_seat_vote_curve;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SmdSeatVoteCurveController {
	@Autowired
	public SeatVoteCurveService service;
	
	@GetMapping("/smd_district_plans/seat_vote_curve")
	public SeatVoteCurveData getSeatVoteCurveData(@RequestParam("name") String name) {
		return service.getSeatVoteCurveDataByName(name);
	}
}
