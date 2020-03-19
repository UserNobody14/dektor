package com.ben.dektor.entities

import javax.persistence.*

@Entity
data class ThreadPoll(
      @Id @GeneratedValue val threadId: Long,
      val category: String,
      @OneToMany val pollVotes: List<ThreadPollVotes>
)