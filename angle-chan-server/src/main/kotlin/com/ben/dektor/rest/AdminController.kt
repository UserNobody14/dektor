package com.ben.dektor.rest

import com.ben.dektor.entities.CatalogThread
import com.ben.dektor.entities.MediaContainer
import com.ben.dektor.entities.MediaInfo
import com.ben.dektor.entities.Post
import com.ben.dektor.repositories.MediaContainerRepository
import com.ben.dektor.repositories.PostRepository
import com.ben.dektor.repositories.ThreadRepository
import com.ben.dektor.store.MediaStore
import com.ben.dektor.store.ThumbnailStore
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/admin")
class AdminController(
        @Autowired
        private val postRepository: PostRepository,
        @Autowired
        val mediaContainerRepository: MediaContainerRepository,
        @Autowired
        private val threadRepository: ThreadRepository,
        @Autowired
        private val mediaStore: MediaStore,

        @Autowired
        private val thumbnailStore: ThumbnailStore
) {
    @DeleteMapping("/post")
    fun post(@RequestBody() p: Post) {
        postRepository.delete(p);
    }
    @DeleteMapping("/media")
    fun media(@RequestBody() p: MediaContainer) {
        mediaStore.unsetContent(p.info)
        thumbnailStore.unsetContent(p.thumbnail)
        mediaContainerRepository.delete(p)
//        postRepository.delete(p);
    }
    @DeleteMapping("/thread")
    fun thread(@RequestBody() p: CatalogThread) {
        threadRepository.delete(p)
    }
}