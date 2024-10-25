package com.cse416.server.states_available;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StatesAvailableController {
	@Autowired
	public StatesAvailableService statesAvailableService;
	
	@GetMapping("/states_available")
	public List<State> getStatesAvailable() {
		List<State> statesAvailable = statesAvailableService.getAllStatesAvailable();
		return statesAvailable;
	}
}
