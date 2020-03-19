package com.ben.dektor.entities


import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import org.hibernate.annotations.CreationTimestamp
import java.sql.Date
import javax.persistence.*

@Entity
class Post (
    @Id
    var number: Long = 0,
    var name: String,

    @ManyToOne(cascade = [CascadeType.DETACH])
    @JsonManagedReference
    var thread: CatalogThread?,

    @CreationTimestamp
    var utc: Date?,
    var text: String,

    @OneToMany(cascade = [CascadeType.ALL])
    var media: MutableList<MediaContainer>,

    @ElementCollection
    var replies: List<Long>?
    )