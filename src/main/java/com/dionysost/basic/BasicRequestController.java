package com.dionysost.basic;


import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class BasicRequestController {

    
	@GetMapping("/api/video/thumb/{id}")
	public String GetVideoThumb(@PathVariable("id") String id) throws JsonProcessingException 
	{
		HashMap<String, Object> jsonObject = new HashMap<>();

        // key-value 쌍 추가
        jsonObject.put("vidCode", id);
        jsonObject.put("vidName", "This is Test Data!");
        jsonObject.put("vidImg", "t1");
        jsonObject.put("chName", "John Doe");
        jsonObject.put("chImg", "tu");
        jsonObject.put("views", "100");

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}
	@GetMapping("/video/view/{id}")
	public String GetVideoView(@PathVariable("id") String id) throws JsonProcessingException
	{
		HashMap<String, Object> jsonObject = new HashMap<>();

        // key-value 쌍 추가
        jsonObject.put("vidCode", id);
        jsonObject.put("vidImg", "t1");
        jsonObject.put("chName", "John Doe");
        jsonObject.put("chImg", "tu");
        jsonObject.put("views", "100");
        
        jsonObject.put("vidFile", "yy.mp4");

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}
	@GetMapping("/video/detail/:id")
	public String GetVideoDetail(String id)
	{
		return "hello";
	}

	
	@GetMapping("/video/streaming/:id")
	public String GetVideoStreaming(String id)
	{
		return "hello";
	}
}