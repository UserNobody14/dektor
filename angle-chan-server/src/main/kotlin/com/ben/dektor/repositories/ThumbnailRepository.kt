package com.ben.dektor.repositories

import com.ben.dektor.entities.Thumbnail
import org.springframework.data.jpa.repository.JpaRepository

interface ThumbnailRepository : JpaRepository<Thumbnail?, Long?>