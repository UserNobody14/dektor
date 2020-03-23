package com.ben.dektor.store

import com.ben.dektor.entities.Thumbnail
import org.springframework.content.commons.repository.ContentStore
import org.springframework.content.rest.StoreRestResource
import org.springframework.stereotype.Component

//@Service
@StoreRestResource(path = "thumbnail")
@Component
interface ThumbnailStore : ContentStore<Thumbnail?, String?>