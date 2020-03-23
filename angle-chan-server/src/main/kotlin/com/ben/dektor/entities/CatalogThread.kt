package com.ben.dektor.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import lombok.Data
import javax.persistence.*

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "number")
@Entity
data class CatalogThread (
    //    TODO: make the thread subdivided under boards & posts also subdivided (to prevent overuse/concurrency?)
        @Id
        @GeneratedValue
        var number: Long,
        var subject: String,

    //    @OneToOne()
    //    private Post originalPost;
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