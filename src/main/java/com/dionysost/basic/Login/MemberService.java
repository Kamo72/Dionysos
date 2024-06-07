package com.dionysost.basic.Login;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;


    public boolean checkLoginIdDuplicate(String loginId) {
        return memberRepository.existsByLoginId(loginId);
    }

    public boolean checkNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    public void join(JoinRequest req) {
    	memberRepository.save(req.toEntity());
    }

    public Member login(LoginRequest req) {
        Optional<Member> optionalUser = memberRepository.findByLoginId(req.getLoginId());

        if(optionalUser.isEmpty()) {
            return null;
        }

        Member user = optionalUser.get();

        if(!user.getPassword().equals(req.getPassword())) {
            return null;
        }

        return user;
    }

    public Member getLoginUserById(Long userId) {
        if(userId == null) return null;

        Optional<Member> optionalUser = memberRepository.findById(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    public Member getLoginUserByLoginId(String loginId) {
        if(loginId == null) return null;

        Optional<Member> optionalUser = memberRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}