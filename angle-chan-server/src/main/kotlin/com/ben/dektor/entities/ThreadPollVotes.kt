package com.ben.dektor.entities

import javax.persistence.Entity
import javax.persistence.Id
//Idea: currently have this
@Entity
class ThreadPollVotes(
        @Id val id: Long,
        val postNumber: Long
)