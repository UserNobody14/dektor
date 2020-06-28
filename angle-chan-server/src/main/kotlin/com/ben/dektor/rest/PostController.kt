package com.ben.dektor.rest

import com.ben.dektor.entities.*
import com.ben.dektor.repositories.MediaContainerRepository
import com.ben.dektor.repositories.PostRepository
import com.ben.dektor.repositories.ThreadRepository
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
import java.lang.Exception

@RestController
@RequestMapping("/fileAccess")
class PostController (
        @Autowired
        private val postRepository: PostRepository,
        @Autowired
        val mediaContainerRepository: MediaContainerRepository,
        @Autowired
        private val threadRepository: ThreadRepository,
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
            @RequestParam("file") file: MultipartFile): MediaContainer {
//        System.out.println("here I am");
//        TODO: make it so only the creator of the post can add new images to it
//        TODO: make it so once the creator is done, & the post is finalized
//        they can't edit it anymore.
//        TODO: idea: media containers have associated ip addresses.
//        The user uploads a series of media containers,
//        in a statement that returns a MediaContainer?
//        val media = MediaContainer()
//        TODO: make illegitimate pics get deleted 2 prevent abuse?
//        TODO: make it require a captcha as well? (to prevent spam)
        val mediaContainer = MediaContainer(
                null,
                MediaInfo(file.contentType ?: throw IOException()),
                Thumbnail(file.contentType ?: throw IOException()),
                file.size.toString(),
                "$galleryNumber$id${file.originalFilename}",
                "image"
        )
//        val returned = mediaContainerRepository.save(mediaContainer)
//TODO: determine and set height & width?
//        TODO: determine and set thumbnail if item is a webm? or cbz? or other?
//        TODO: add functionality related to image hashing!
        mediaStore.setContent(mediaContainer.info, file.inputStream)
        val out = ByteArrayOutputStream()
        Thumbnails.of(file.inputStream)
                .size(120, 85)
                .toOutputStream(out)
        thumbnailStore.setContent(mediaContainer.thumbnail, ByteArrayInputStream(out.toByteArray()))

        // save updated content-related info
        return mediaContainerRepository.save(mediaContainer)

    }

    @PostMapping(path = ["/post"])
    fun makePost(@RequestBody post: Post, @RequestParam(value = "captcha") captcha: String): Post {
        captchaService.processResponse(captcha)
//TODO: switch to a microservice style architecture? w/captcha verification done ahead of this?
//        TODO: make saving the post an async result of catcha finishing?
        return handlePost(post)
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

    fun handlePost(post: Post): Post {
        //        TODO: reset a post's id to zero so no post is overridden?
//TODO: read through the post text and add it to the replies of other posts?
        return postRepository.save(Post(post, false))
    }
    @PostMapping(path = ["/createThread/{board}"])
    fun makeThread(
            @RequestBody post: Post,
            @RequestParam("captcha") captcha: String
    ): Post {
        captchaService.processResponse(captcha)
        val isNull = post.thread?.subject == null
        val thread = CatalogThread(
                0,
                if (post.thread?.subject != null) post.thread!!.subject else "",
                mutableListOf(),
                post.thread!!.board
                )

        val nthread = threadRepository.saveAndFlush(thread)
        post.thread = nthread
        val nPost = Post(post, true)
        return postRepository.saveAndFlush(nPost)
//        verify that the thread only contains one post and add it
//        val posts = thread.posts;
//        if (posts.size == 1) {
//            thread.posts = mutableListOf(handlePost(posts[0]))
//            return threadRepository.save(thread)
//        } else {
//            throw Exception("tried to save a thread w/ more than one post...")
//        }
    }
}