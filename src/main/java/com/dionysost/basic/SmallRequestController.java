package com.dionysost.basic;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class SmallRequestController {

	String URL = Paths.get("").toAbsolutePath().toString() + "\\DataFiles";
	
	@GetMapping(
			  value = "/chImg/{id}",
			  produces = MediaType.IMAGE_JPEG_VALUE
			)
    public @ResponseBody byte[] GetChannelImage(@PathVariable("id") String id) throws IOException
    {
		byte[] data = new byte[0];
	    String inputFile = URL + "\\chImg\\" + id + ".png";
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
	    String inputFile = URL + "\\vidImg\\" + id + ".png";
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
	

	@RequestMapping(value = "/vidFile/{id}", method = RequestMethod.GET)
    public ResponseEntity<ResourceRegion> videoRegion(@RequestHeader HttpHeaders headers, @PathVariable("id") String id) throws Exception {
        String path = URL + "\\vidFile\\"+id+".mp4";
        Resource resource = new FileSystemResource(path);

        long chunkSize = 1024 * 1024;
        long contentLength = resource.contentLength();

        ResourceRegion region;

        try {
            HttpRange httpRange = headers.getRange().stream().findFirst().get();
            long start = httpRange.getRangeStart(contentLength);
            long end = httpRange.getRangeEnd(contentLength);
            long rangeLength = Long.min(chunkSize, end -start + 1);

			/* log.info("start === {} , end == {}", start, end); */

            region = new ResourceRegion(resource, start, rangeLength);
        } catch (Exception e) {
            long rangeLength = Long.min(chunkSize, contentLength);
            region = new ResourceRegion(resource, 0, rangeLength);
        }

        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .cacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES))
                .contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .header("Accept-Ranges", "bytes")
                .eTag(path)
                .body(region);

    }

}

