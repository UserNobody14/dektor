package com.ben.dektor.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import lombok.Data
import javax.persistence.*


@Entity
class CatalogThread (
    //    TODO: make the thread subdivided under boards & posts also subdivided (to prevent overuse/concurrency?)
        @Id
        var number: Long,
        var subject: String,

    //    @OneToOne()
    //    private Post originalPost;
        @JsonBackReference
        @OneToMany(cascade = [CascadeType.PERSIST])
        var posts: MutableList<Post>,
        @ManyToOne(cascade = [CascadeType.DETACH])
        var board: Board
)
//constructor() {}
//constructor(number: Long, subject: String?, board: String?) {
//    this.number = number
//    this.subject = subject
//    this.board = board
//}