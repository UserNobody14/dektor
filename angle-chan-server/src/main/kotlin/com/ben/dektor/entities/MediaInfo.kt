package com.ben.dektor.entities

import lombok.Data
import org.springframework.content.commons.annotations.ContentId
import org.springframework.content.commons.annotations.ContentLength
import org.springframework.content.commons.annotations.MimeType
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id


@Entity
data class MediaInfo (
    @Id @GeneratedValue
    var link: Long? = 0,
    var height: Long?,
    var width: Long?,

    @ContentId
    var contentId: UUID?,

    @ContentLength
    var contentLength: Long?,

    @MimeType
    var mimeType: String = "text/plain"
    ) {
    constructor(mimeType: String) : this(
            null,
            null,
            null,
            null,
            null,
            mimeType)
}