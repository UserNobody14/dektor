package com.ben.dektor.store

import com.ben.dektor.entities.MediaInfo
import org.springframework.content.commons.repository.ContentStore
import org.springframework.content.rest.StoreRestResource
import org.springframework.stereotype.Component
import javax.annotation.Resource

//@Service
@StoreRestResource(path = "media")
@Component
//@Resource(name = "mediaStore")
interface MediaStore : ContentStore<MediaInfo?, String?>