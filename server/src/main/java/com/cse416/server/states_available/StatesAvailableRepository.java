package com.cse416.server.states_available;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatesAvailableRepository extends MongoRepository<State, String> {
	List<State> findAll();
}
