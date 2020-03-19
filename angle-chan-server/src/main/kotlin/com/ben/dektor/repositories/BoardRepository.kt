package com.ben.dektor.repositories

import com.ben.dektor.entities.Board
import org.springframework.data.jpa.repository.JpaRepository

interface BoardRepository  : JpaRepository<Board?, String?>