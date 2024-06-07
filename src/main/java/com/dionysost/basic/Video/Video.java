package com.dionysost.basic.Video;


import com.dionysost.basic.Login.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageCode;
    private String name;
    private long view;
    private String password;
    
    @ManyToOne
    private Member member;
}