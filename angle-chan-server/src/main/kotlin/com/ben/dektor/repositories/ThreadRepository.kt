package com.ben.dektor.repositories

import com.ben.dektor.entities.CatalogThread
import org.springframework.data.jpa.repository.JpaRepository

interface ThreadRepository : JpaRepository<CatalogThread?, Long?>