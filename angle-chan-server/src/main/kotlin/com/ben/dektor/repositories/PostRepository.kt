package com.ben.dektor.repositories

import com.ben.dektor.entities.Post
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PostRepository : JpaRepository<Post?, Long?> {
    @Query("SELECT p from Post p where p.thread.number = :thread order by p.utc")
    fun fetchPageForThread(thread: Long, pageable: Pageable): Page<Post>
}