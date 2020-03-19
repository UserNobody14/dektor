package com.ben.dektor.entities

import lombok.Data
import org.springframework.content.commons.annotations.ContentId
import org.springframework.content.commons.annotations.ContentLength
import org.springframework.content.commons.annotations.MimeType
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity

class Thumbnail (
    @Id @GeneratedValue
    var link: Long? = 0,
    var height: Long?,
    var width: Long?,

    // Spring Content managed attributes
    @ContentId
    var contentId: String,

    @ContentLength
    var contentLen: Long?,

    @MimeType
    var mimeType: String = "text/plain"
)