package com.ben.dektor.rest

import com.ben.dektor.entities.CatalogThread
import com.ben.dektor.entities.Post
import com.ben.dektor.repositories.PostRepository
import com.ben.dektor.repositories.ThreadRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping(value = ["/thread"])
class ThreadController(
        @Autowired
        private val threadRepository: ThreadRepository,
        @Autowired
        private val postRepository: PostRepository
) {


    @GetMapping(path = ["/{number}"])
    fun expFile(@PathVariable number: Long): CatalogThread {
//        System.out.println("here I am");
        return threadRepository.findById(number).get()
    }

    @GetMapping(path = ["paged/{number}"])
    fun pagedThread(@PathVariable number: Long, page: Pageable): Page<Post> {
//        System.out.println("here I am");
        return postRepository.fetchPageForThread(number, page)
    }

    @PostMapping("/sendOTP")
    fun sendOTP(): String {
        return "OTP sent"
    }
}