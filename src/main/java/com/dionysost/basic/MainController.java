
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
	
	//private final MemberRepository memberRepository;

    @GetMapping({"/", "/*", "/view/*", "/search/*", "/channel/*"})
    public String Main() {
    	return "../static/index";		
    }    
    
	/*
	 * @GetMapping({"/", "/*", "/**"}) public String Main(@CookieValue(name =
	 * "memberId", required = false) Long memberId, Model model) {
	 * 
	 * System.out.println("model : " + model); // 로그인한 사용자가 아니라면 home으로 보낸다. if
	 * (memberId == null) { System.out.println("/ => memberId == null"); return
	 * "../static/index"; }
	 * 
	 * // db 조회 Optional<Member> optionalMember =
	 * memberRepository.findById(memberId); // 사용자가 없으면 null 처리 필요
	 * if(optionalMember.isEmpty()) {
	 * System.out.println("/ => loginMember == null"); return "../static/index"; }
	 * 
	 * // loginHome : 로그인에 성공한 사람만이 볼 수 있는 화면 model.addAttribute("member",
	 * optionalMember.get()); System.out.println("model : " + model);
	 * System.out.println("/ => model.addAttribute"); return "../static/index";
	 * 
	 * 
	 * 
	 * }
	 */

}