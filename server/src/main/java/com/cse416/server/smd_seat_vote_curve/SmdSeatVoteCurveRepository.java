package com.cse416.server.smd_seat_vote_curve;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SmdSeatVoteCurveRepository extends MongoRepository<SeatVoteCurveData, String> {
	@Cacheable(value = "smdSeatVoteCurveRepository", key="#name")
	SeatVoteCurveData findByName(String name);
}
