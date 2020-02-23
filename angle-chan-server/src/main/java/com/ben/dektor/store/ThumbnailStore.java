package com.ben.dektor.store;

import com.ben.dektor.entities.MediaInfo;
import com.ben.dektor.entities.Thumbnail;
import org.springframework.content.commons.repository.ContentStore;
import org.springframework.content.rest.StoreRestResource;

@StoreRestResource(path = "thumbnail")
public interface ThumbnailStore extends ContentStore<Thumbnail, String> {
}
