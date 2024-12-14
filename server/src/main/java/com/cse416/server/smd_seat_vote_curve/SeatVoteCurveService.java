package com.cse416.server.smd_seat_vote_curve;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatVoteCurveService {
	@Autowired
	private SmdSeatVoteCurveRepository repository;
	
	public SeatVoteCurveData getSeatVoteCurveDataByName(String name) {
		return repository.findByName(name);
	}
}
