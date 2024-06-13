
package com.dionysost.basic;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

import com.dionysost.basic.Login.Member;
import com.dionysost.basic.Login.MemberRepository;

import lombok.AllArgsConstructor;


@Controller
@AllArgsConstructor
public class MainController {
	
    @GetMapping({"/", "/*", "/view/*", "/search/*", "/channel/*"})
    public String Main() {
    	return "../static/index";		
    }    
}