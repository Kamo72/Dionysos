package com.dionysost.basic.Login;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChannelImageRequest{
    private Member member;
    private String imageCode;
}
