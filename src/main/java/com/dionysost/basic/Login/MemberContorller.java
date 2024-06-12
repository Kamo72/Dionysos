package com.dionysost.basic.Login;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dionysost.basic.Video.UploadRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Transactional
@RequiredArgsConstructor
public class MemberContorller {

	String URL = "S:\\[SpringSTS4]\\Dionysos\\DataFiles";
	private final MemberService memberService;
	
	@GetMapping("/api/channel/basic/{id}")
    public String signout(@PathVariable("id") String id,
            HttpServletResponse response) throws IOException {
		
		Long idInt = Long.parseLong(id);
		Member member = memberService.getLoginUserById(idInt);
		
		
		HashMap<String, Object> jsonObject = new HashMap<>();

        // key-value 쌍 추가
        jsonObject.put("userImg", member.getImageCode());
        jsonObject.put("userName", member.getNickname());

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}
	
	
    @PostMapping("/api/channel/image")
    public String SetImage(
    		@RequestParam("image") MultipartFile image,
    		@RequestParam("memberId") String memberId
	) {
		if (!image.isEmpty()) {
	        try {
		
		        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
		        String nowTimeStr = LocalDateTime.now().format(formatter);
		        
		        // 업로드할 디렉토리 경로 설정
		        String imageFileDir = URL + "\\chImg";
		        Path imageFilePath = Paths.get(imageFileDir, nowTimeStr + ".png");
		        Files.write(imageFilePath, image.getBytes());
		        
                Long meberIdInt = Long.parseLong(memberId);
                Member member = memberService.getLoginUserById(meberIdInt);
                
		        ChannelImageRequest req = new ChannelImageRequest(member, nowTimeStr);
                
		        memberService.updateImage(req);
		        
		        return "File uploaded successfully";
		        
		    } catch (Exception e) {
		        e.printStackTrace();
		        return "Failed to upload file: " + e.getMessage();
		    }
		} else {
		    return "Failed to upload file: File is empty";
		}

    }
}
