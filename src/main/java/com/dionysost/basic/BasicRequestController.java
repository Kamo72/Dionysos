package com.dionysost.basic;


import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class BasicRequestController {

    
	@GetMapping("/video/thumb/{id}")
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
        jsonObject.put("vidName", "This is Test Data!");
        jsonObject.put("vidImg", "t1");
        jsonObject.put("chName", "John Doe");
        jsonObject.put("chImg", "tu");
        jsonObject.put("views", "100");

        jsonObject.put("vidFile", "a");
        jsonObject.put("chSubs", "10");

        // JSON 형식의 문자열로 변환
        String jsonString = new ObjectMapper().writeValueAsString(jsonObject);
		return jsonString;
	}

}