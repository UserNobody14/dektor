package com.ben.dektor.entities


import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import org.hibernate.annotations.CreationTimestamp
import java.sql.Date
import javax.persistence.*
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "number")
@Entity
data class Post (
    @Id
    @GeneratedValue
    var number: Long?,
    var name: String,

    @ManyToOne(cascade = [CascadeType.DETACH])
    var thread: CatalogThread?,

    @CreationTimestamp
    var utc: Date?,
    var text: String,

    @OneToMany(cascade = [CascadeType.DETACH])
    var media: MutableList<MediaContainer>,

    @ElementCollection
    var replies: List<Long>?,
    var isOp: Boolean
    ) {
    constructor(old: Post): this(
            null,
            old.name,
            old.thread,
            old.utc,
            old.text,
            old.media,
            old.replies,
            old.isOp
    )
    constructor(old: Post, isOp: Boolean): this(
            null,
            old.name,
            old.thread,
            old.utc,
            old.text,
            old.media,
            old.replies,
            isOp
    )

}