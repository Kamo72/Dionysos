package com.dionysost.basic;

import com.dionysost.basic.storage.StorageFileNotFoundException;
import com.dionysost.basic.storage.StorageService;

import java.io.FileOutputStream;
import java.io.InputStream;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/api")
public class TestController {


    private final StorageService storageService = null;
    
	@GetMapping("/video/descript/:id")
	public String GetVideoDescript(String id)
	{
		return "hello";
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


	@PostMapping("/video/upload")
	public String PostVideo(@RequestParam("file") MultipartFile file) {
		
		System.out.println("파일 이름 : " + file.getOriginalFilename());
		System.out.println("파일 크기 : " + file.getSize());
		
        try(
                // 맥일 경우 
                //FileOutputStream fos = new FileOutputStream("/tmp/" + file.getOriginalFilename());
                // 윈도우일 경우
                FileOutputStream fos = new FileOutputStream("c:/tmp/" + file.getOriginalFilename());
                InputStream is = file.getInputStream();
        )
        {
    	    int readCount = 0;
    	    byte[] buffer = new byte[1024];
    	    
            while((readCount = is.read(buffer)) != -1)
            {
                fos.write(buffer,0,readCount);
            }
            
        }catch(Exception ex){
            throw new RuntimeException("file Save Error");
        }
		
		
		return "uploadok";
	}
}