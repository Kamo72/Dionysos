package com.dionysost.basic;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SmallRequestController {

	@GetMapping(
			  value = "/chImg/{id}",
			  produces = MediaType.IMAGE_JPEG_VALUE
			)
    public @ResponseBody byte[] GetChannelImage(@PathVariable("id") String id) throws IOException
    {
		byte[] data = new byte[0];
	    String inputFile = "F:\\[STS4 Storage]\\Dionysos\\DataFiles\\chImg\\" + id + ".png";
	    try {
	        InputStream inputStream = new FileInputStream(inputFile);
	        long fileSize = new File(inputFile).length();
	        data = new byte[(int) fileSize];
	        inputStream.read(data);        
	        inputStream.close();                                        
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return data;
    }

	@GetMapping(
			  value = "/vidImg/{id}",
			  produces = MediaType.IMAGE_JPEG_VALUE
			)
    public @ResponseBody byte[] GetVideoImage(@PathVariable("id") String id) throws IOException
    {
		byte[] data = new byte[0];
	    String inputFile = "F:\\[STS4 Storage]\\Dionysos\\DataFiles\\vidImg\\" + id + ".png";
	    try {
	        InputStream inputStream = new FileInputStream(inputFile);
	        long fileSize = new File(inputFile).length();
	        data = new byte[(int) fileSize];
	        inputStream.read(data);         
	        inputStream.close();                                  
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return data;
    }
	

	
	@GetMapping("/vidfile/{filename}")
    public ResponseEntity<InputStreamResource> getVideo(@PathVariable String filename) throws FileNotFoundException {
        File file = new File("F:\\[STS4 Storage]\\Dionysos\\DataFiles\\vidFile\\" + filename);
        if (!file.exists()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FileInputStream fileInputStream = new FileInputStream(file);
        InputStreamResource resource = new InputStreamResource(fileInputStream);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "video/mp4");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .body(resource);
    }
}

