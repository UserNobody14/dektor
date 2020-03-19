package com.ben.dektor.store

import com.ben.dektor.entities.MediaInfo
import org.springframework.content.commons.repository.ContentStore
import org.springframework.content.rest.StoreRestResource

//@Service
@StoreRestResource(path = "media")
interface MediaStore : ContentStore<MediaInfo?, String?>