package com.cse416.server.states_available;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatesAvailableService {
	@Autowired
	private StatesAvailableRepository statesAvailableRepository;
	
	public List<State> getAllStatesAvailable() {
		return statesAvailableRepository.findAll();
	}
}
