package com.ben.dektor.rest

import com.ben.dektor.entities.MediaContainer
import com.ben.dektor.entities.MediaInfo
import com.ben.dektor.entities.Post
import com.ben.dektor.entities.Thumbnail
import com.ben.dektor.repositories.MediaContainerRepository
import com.ben.dektor.repositories.PostRepository
import com.ben.dektor.service.CaptchaService
import com.ben.dektor.service.ICaptchaService
import com.ben.dektor.store.MediaStore
import com.ben.dektor.store.ThumbnailStore
import net.coobird.thumbnailator.Thumbnails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.IOException

@RestController
@RequestMapping("/fileAccess")
class PostController (
        @Autowired
        private val postRepository: PostRepository,
        @Autowired
        val mediaContainerRepository: MediaContainerRepository,
        @Autowired
val captchaService: ICaptchaService,
        @Autowired
private val mediaStore: MediaStore,

        @Autowired
private val thumbnailStore: ThumbnailStore
) {


    @CrossOrigin
    @RequestMapping(path = ["/files/{fileId}/{galleryNumber}"], method = [RequestMethod.POST])
    @Throws(IOException::class)
    fun setContent(
            @PathVariable("galleryNumber") galleryNumber: Int,
            @PathVariable("fileId") id: Long,
            @RequestParam("file") file: MultipartFile): MediaContainer? {
//        System.out.println("here I am");
//        TODO: make it so only the creator of the post can add new images to it
//        TODO: make it so once the creator is done, & the post is finalized
//        they can't edit it anymore.
//        TODO: idea: media containers have associated ip addresses.
//        The user uploads a series of media containers,
//        in a statement that returns a MediaContainer?
//        val media = MediaContainer()
//        TODO: make illegitimate pics get deleted 2 prevent abuse?
        val mediaContainer = MediaContainer(
                null,
                MediaInfo(
                        null,
                        null,
                        null,
                        (file.originalFilename ?: file.name) + galleryNumber + id,
                        null,
                        file.contentType ?: throw IOException()
                ),
                Thumbnail(
                        null,
                        null,
                        null,
                        (file.originalFilename ?: file.name) + galleryNumber + id + "s",
                        null,
                        file.contentType ?: throw IOException()
                ),
                file.size.toString(),
                null,
                "image"
        )
        val info = mediaContainer.info
        val thumbnail = mediaContainer.thumbnail
        val returned = mediaContainerRepository.save(mediaContainer)
        mediaStore.setContent(info, file.inputStream)
        val out = ByteArrayOutputStream()
        Thumbnails.of(file.inputStream)
                .size(120, 85)
                .toOutputStream(out)
        thumbnailStore.setContent(thumbnail, ByteArrayInputStream(out.toByteArray()))

        // save updated content-related info

        return returned
    }

    @PostMapping(path = ["/post"])
    fun makePost(@RequestBody post: Post, @RequestParam(value = "captcha") captcha: String): Post {
        captchaService.processResponse(captcha)
        return postRepository.save(post)
    } //    @GetMapping(path = "experimentFile/:numberV")
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