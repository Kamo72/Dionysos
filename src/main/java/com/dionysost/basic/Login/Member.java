package com.dionysost.basic.Login;

import java.util.List;

import com.dionysost.basic.Video.Video;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageCode;
    private String loginId;
    private String password;
    private String nickname;
    
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE) 
    private List<Video> videoList; 
}