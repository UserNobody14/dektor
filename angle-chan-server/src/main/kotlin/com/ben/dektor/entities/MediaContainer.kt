package com.ben.dektor.entities

import lombok.Data
import javax.persistence.*

@Entity
data class MediaContainer (
    @Id
    @GeneratedValue
    var id: Long?,

    @OneToOne(cascade = [CascadeType.ALL])
    var info: MediaInfo,

    @OneToOne(cascade = [CascadeType.ALL])
    var thumbnail: Thumbnail,
    var mediaSizeKb: String?,
    var title: String?,
    var mediaType: String?
    )