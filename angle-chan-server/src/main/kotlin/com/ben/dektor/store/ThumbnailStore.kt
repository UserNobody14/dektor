package com.ben.dektor.store

import com.ben.dektor.entities.Thumbnail
import org.springframework.content.commons.repository.ContentStore
import org.springframework.content.rest.StoreRestResource

//@Service
@StoreRestResource(path = "thumbnail")
interface ThumbnailStore : ContentStore<Thumbnail?, String?>