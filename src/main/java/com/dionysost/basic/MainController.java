
package com.dionysost.basic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping("/*")
	public String Main()
	{
		return "../static/index";
	}
	

	@GetMapping("/search/*")
	public String Search()
	{
		return "../static/index";
	}
	

	@GetMapping("/video/*")
	public String Video()
	{
		return "../static/index";
	}
}