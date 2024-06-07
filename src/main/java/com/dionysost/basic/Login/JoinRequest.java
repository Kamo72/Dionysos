package com.dionysost.basic.Login;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class JoinRequest {

    private String loginId;

    private String password;
    private String passwordCheck;

    private String nickname;

    // 비밀번호 암호화 X
    public Member toEntity() {
        return Member.builder()
                .loginId(this.loginId)
                .password(this.password)
                .nickname(this.nickname)
                .build();
    }

}