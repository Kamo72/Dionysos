
package com.dionysost.basic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping("/*")
	public String Test()
	{
		return "../static/index";
	}
}