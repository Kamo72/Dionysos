package com.dionysost.basic.Video;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dionysost.basic.Login.Member;
import com.dionysost.basic.Login.MemberRepository;
import com.dionysost.basic.Login.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final MemberService memberService;

    public List<Video> GetSearchedVideosBy(String keyword)
    {
    	return videoRepository.findByNameContaining(keyword);
    }
    public List<Video> GetChannelVideosBy(String chId)
    {
    	Member member = memberService.getLoginUserById(Long.parseLong(chId));
    	
    	if(member == null)
    		return new LinkedList<Video>();
    	return videoRepository.findByMember(member);
    }
	public List<Video> GetRandomVideos() {
		List<Video> videos = videoRepository.findAll();
	    
	    // 리스트를 섞는다
	    Collections.shuffle(videos);
	    
	    // 최대 20개까지 무작위로 선택
	    return videos.stream()
	                 .limit(20)
	                 .collect(Collectors.toList());
	}
    
	public Video GetVideoById(Long id)
	{
		Video video = videoRepository.existsById(id)? videoRepository.findById(id).get() : null;
		
		return video;
	}
	
    public Video CreateVideo(UploadRequest req) 
    {
    	Video video = req.toEntity();

    	videoRepository.save(video);
    	
    	return video;
    }
	public void AddViewCount(long id) 
	{
		videoRepository.updateVideoViewById(id);
	}
    
    
    
}
