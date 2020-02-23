package com.ben.dektor.rest;

import com.ben.dektor.entities.MediaContainer;
import com.ben.dektor.entities.MediaInfo;
import com.ben.dektor.entities.Post;
import com.ben.dektor.entities.Thumbnail;
import com.ben.dektor.repositories.PostRepository;
import com.ben.dektor.store.MediaStore;
import com.ben.dektor.store.ThumbnailStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fileAccess")
public class PostController {
    @Autowired private
    PostRepository postRepository;
    @Autowired private MediaStore mediaStore;
    @Autowired private ThumbnailStore thumbnailStore;

    @CrossOrigin
    @RequestMapping(path ="/files/{fileId}/{galleryNumber}", method = RequestMethod.POST)
    public ResponseEntity<?> setContent(
            @PathVariable("galleryNumber") int galleryNumber,
            @PathVariable("fileId") Long id,
            @RequestParam("file") MultipartFile file)
            throws IOException {
//        System.out.println("here I am");
        Optional<Post> f = postRepository.findById(id);
        if (f.isPresent()) {

            Post p = f.get();
            List<MediaContainer> media = p.getMedia();
            MediaContainer mediaContainer = media.get(galleryNumber);
            MediaInfo info = mediaContainer.getInfo();
            Thumbnail thumbnail =  mediaContainer.getThumbnail();
            info.setMimeType(file.getContentType());
            thumbnail.setMimeType(file.getContentType());
            mediaContainer.setThumbnail(thumbnail);
            mediaContainer.setInfo(info);
            media.set(galleryNumber, mediaContainer);
            p.setMedia(media);
            mediaStore.setContent(info, file.getInputStream());
            var out = new ByteArrayOutputStream();
            Thumbnails.of(file.getInputStream())
                    .size(120, 85)
                    .toOutputStream(out);
            thumbnailStore.setContent(thumbnail, new ByteArrayInputStream(out.toByteArray()));

            // save updated content-related info
            postRepository.save(p);

            return new ResponseEntity<Object>(HttpStatus.OK);
        }
        return null;
    }
    @PostMapping(path = "/post")
    public Post makePost(@RequestBody Post post) {
        return postRepository.save(post);
    }
//    @GetMapping(path = "experimentFile/:numberV")
//    public Post expFile(@PathVariable("numberV") Long number) {
//        System.out.println("here I am");
//        return postRepository.findById(number).get();
//    }

//    @RequestMapping(value="/files/{fileId}", method = RequestMethod.GET)
//    public ResponseEntity<?> getContent(@PathVariable("fileId") Long id) {
//
//        Optional<Post> f = postRepository.findById(id);
//        if (f.isPresent()) {
//            InputStreamResource inputStreamResource = new InputStreamResource(contentStore.getContent(f.get()));
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentLength(f.get().getContentLength());
//            headers.set("Content-Type", f.get().getMimeType());
//            return new ResponseEntity<Object>(inputStreamResource, headers, HttpStatus.OK);
//        }
//        return null;
//    }
}
