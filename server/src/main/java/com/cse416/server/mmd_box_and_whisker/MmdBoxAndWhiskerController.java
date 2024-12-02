package com.cse416.server.mmd_box_and_whisker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MmdBoxAndWhiskerController {
	@Autowired
	public MmdBoxAndWhiskerService mmdBoxAndWhiskerService;
	
	@GetMapping("/box_and_whisker/mmd")
	public MmdBoxAndWhiskerPlotData getMmdBoxAndWhiskerData(@RequestParam("state") String state, @RequestParam("boc") String boc) {
		MmdBoxAndWhiskerPlotData boxAndWhiskerData = mmdBoxAndWhiskerService.getByStateAndBOC(state, boc);
		return boxAndWhiskerData;
	}
}
