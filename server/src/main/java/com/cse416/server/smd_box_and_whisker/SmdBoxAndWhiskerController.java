package com.cse416.server.smd_box_and_whisker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SmdBoxAndWhiskerController {
	@Autowired
	public SmdBoxAndWhiskerService smdBoxAndWhiskerService;
	
	
	@GetMapping("/box_and_whisker/smd")
	public BOC getSmdBoxAndWhiskerData(@RequestParam("state") String state, @RequestParam("boc") String boc) {
		BOC boxAndWhiskerData = smdBoxAndWhiskerService.getByStateAndBOC(state, boc);
		return boxAndWhiskerData;
	}
}
