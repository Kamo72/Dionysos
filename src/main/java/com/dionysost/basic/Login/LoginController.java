package com.dionysost.basic.Login;


import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Transactional
@RequiredArgsConstructor
public class LoginController {
	
	private final MemberService memberService;
	@PostMapping("/api/signout")
    public String signout(
            HttpServletResponse response) throws IOException {
		
		
		Cookie cookie = new Cookie("userId", "");
		cookie.setMaxAge(0);  // 유효시간을 0으로 설정하여 쿠키를 제거
		cookie.setPath("/");  // 도메인 전역에서 유효
		response.addCookie(cookie);

        return ".";
	}
	
	@PostMapping("/api/signin")
    public String signin(@RequestBody Map<String, String> data,
            HttpServletResponse response) throws IOException {
		
		LoginRequest loginRequest = new LoginRequest(
				data.get("idLogin"),
				data.get("password"));
		
        Member member = memberService.login(loginRequest);
        

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if(member == null) {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }
        
        if(response.getStatus() != HttpServletResponse.SC_OK) {
            return ".";
        }


        // 로그인 성공 => 쿠키 생성
        Cookie cookie = new Cookie("userId", String.valueOf(member.getId()));
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);  // 쿠키 유효 시간 : 1시간
        response.addCookie(cookie);

        return ".";
    }
	

	@PostMapping("/api/signup")
	public String signup(@RequestBody Map<String, String> data,
            HttpServletResponse response) throws IOException  {

		JoinRequest joinRequest = new JoinRequest(
				data.get("idLogin"),
				data.get("pwOrigin"),
				data.get("pwCheck"),
				data.get("nickName"));
		
        // loginId 중복 체크
        if(memberService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 아이디가 중복됩니다.");
        }
        // 닉네임 중복 체크
        else if(memberService.checkNicknameDuplicate(joinRequest.getNickname())) {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "닉네임이 중복됩니다.");
        }
        // password와 passwordCheck가 같은지 체크
        else if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "바밀번호가 일치하지 않습니다.");
        }
        
        if(response.getStatus() != HttpServletResponse.SC_OK) {
            return ".";
        }

        memberService.join(joinRequest);
        
		System.out.println("/api/signup > " + data);
		
        return ".";
	}
	
}