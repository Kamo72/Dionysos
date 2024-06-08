package com.dionysost.basic.Video;

import com.dionysost.basic.Login.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UploadRequest {


    private String name;
    private Member member;

    private String videoCode;
    private String imageCode;
    
    

    // 비밀번호 암호화 X
    public Video toEntity() {
        return Video.builder()
                .name(this.name)
                .member(this.member)
                .videoCode(this.videoCode)
                .imageCode(this.imageCode)
                .view(0)
                .build();
    }

}