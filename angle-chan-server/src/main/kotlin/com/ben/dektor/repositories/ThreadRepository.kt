package com.ben.dektor.repositories

import com.ben.dektor.entities.CatalogThread
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ThreadRepository : JpaRepository<CatalogThread?, Long?> {
    @Query(
            "select case when (count(c) > 0)  " +
                    "then true else false end from CatalogThread c where c.number = :thread and c.board.boardName = :board")
    fun doesThreadExist(
            thread: Long,
            board: String
    ): Boolean;
}