package com.dionysost.basic.Video;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dionysost.basic.Login.Member;
import com.dionysost.basic.Login.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@Transactional
@RequiredArgsConstructor
public class VideoController {
	
	private final VideoService videoService;
	private final MemberService memberService;

	
    @PostMapping("/api/video/upload")
    public String UploadVideo(
    		@RequestParam("video") MultipartFile video,
    		@RequestParam("image") MultipartFile image,
    		@RequestParam("name") String name,
    		@RequestParam("memberId") String memberId
    		) {
    	if (!video.isEmpty() || !image.isEmpty()) {
            try {

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
                String nowTimeStr = LocalDateTime.now().format(formatter);
                
                
                // 업로드할 디렉토리 경로 설정
                String videoFileDir = "F:\\[STS4 Storage]\\Dionysos\\DataFiles\\vidFile";
                Path videoFilePath = Paths.get(videoFileDir, nowTimeStr + ".mp4");
                Files.write(videoFilePath, video.getBytes());
                
                // 업로드할 디렉토리 경로 설정
                String imageFileDir = "F:\\[STS4 Storage]\\Dionysos\\DataFiles\\vidImg";
                Path imageFilePath = Paths.get(imageFileDir, nowTimeStr + ".png");
                Files.write(imageFilePath, image.getBytes());
                
                Long meberIdInt = Long.parseLong(memberId);
                Member member = memberService.getLoginUserById(meberIdInt);
                
                
                UploadRequest req = new UploadRequest(name,member,nowTimeStr,nowTimeStr);
                
                
                videoService.CreateVideo(req);
                
                return "File uploaded successfully";
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed to upload file: " + e.getMessage();
            }
        } else {
            return "Failed to upload file: File is empty";
        }
		
	}

	@GetMapping("/api/video/thumb/{id}")
	public String GetVideoThumb(@PathVariable("id") String id) throws JsonProcessingException 
	{
		HashMap<String, Object> jsonObject = new HashMap<>();

		Video video = videoService.GetVideoById(Long.parseLong(id));
		Member member = video.getMember();
        // key-value 쌍 추가
        jsonObject.put("vidCode", id);
        jsonObject.put("vidName", video.getName());
        jsonObject.put("vidImg", video.getImageCode());
        jsonObject.put("chId", member.getId());
        jsonObject.put("chName", member.getNickname());
        jsonObject.put("chImg", member.getImageCode());
        jsonObject.put("views", video.getView());

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}
	@GetMapping("/api/video/view/{id}")
	public String GetVideoView(@PathVariable("id") String id) throws JsonProcessingException
	{
		HashMap<String, Object> jsonObject = new HashMap<>();

		Video video = videoService.GetVideoById(Long.parseLong(id));
		Member member = video.getMember();
        // key-value 쌍 추가
        jsonObject.put("vidCode", id);
        jsonObject.put("vidName", video.getName());
        jsonObject.put("vidImg", video.getImageCode());
        jsonObject.put("chId", member.getId());
        jsonObject.put("chName", member.getNickname());
        jsonObject.put("chImg", member.getImageCode());
        jsonObject.put("views", video.getView());

        jsonObject.put("vidFile", video.getVideoCode());
        jsonObject.put("chSubs", "10");

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}

	@GetMapping("/api/video/search/{keyword}")
	public String GetVideoSearch(@PathVariable("keyword") String keyword) throws JsonProcessingException
	{
		List<Video> videos = videoService.GetSearchedVideosBy(keyword);
		List<Long> videoCodes = new LinkedList<Long>();
		
		videos.forEach(vid -> videoCodes.add(vid.getId()));
		
		HashMap<String, Object> jsonObject = new HashMap<>();
        jsonObject.put("videoCodes", videoCodes);

        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}
	
	@GetMapping("/api/video/channel/{id}")
	public String GetVideoChannel(@PathVariable("id") String id) throws JsonProcessingException
	{
		List<Video> videos = videoService.GetChannelVideosBy(id);
		List<Long> videoCodes = new LinkedList<Long>();
		
		videos.forEach(vid -> videoCodes.add(vid.getId()));
		
		HashMap<String, Object> jsonObject = new HashMap<>();
        jsonObject.put("videoCodes", videoCodes);

        System.out.println(videoCodes);
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}

	@GetMapping("/api/video/random")
	public String GetVideoRandom() throws JsonProcessingException
	{
		List<Video> videos = videoService.GetRandomVideos();
		List<Long> videoCodes = new LinkedList<Long>();
		
		videos.forEach(vid -> videoCodes.add(vid.getId()));
		System.out.println(videos);
		
		HashMap<String, Object> jsonObject = new HashMap<>();
        jsonObject.put("videoCodes", videoCodes);
		System.out.println(videoCodes);

        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		System.out.println(jsonString);
		return jsonString;
	}
	
	@PostMapping("/api/video/viewed/{id}")
	public String PostVideoViewed(@PathVariable("id") String id) throws JsonProcessingException
	{
		System.out.println("return");
		videoService.AddViewCount(Long.parseLong(id));	
		return "";
	}
}