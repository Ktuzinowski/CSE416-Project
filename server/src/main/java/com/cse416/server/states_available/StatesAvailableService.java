package com.cse416.server.states_available;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class StatesAvailableService {
	@Autowired
	private StatesAvailableRepository statesAvailableRepository;
	
	@Cacheable(value = "states_available")
	public List<State> getAllStatesAvailable() {
		return statesAvailableRepository.findAll();
	}
}
