package com.ben.dektor.store;

import com.ben.dektor.entities.MediaInfo;
import org.springframework.content.commons.repository.ContentStore;
import org.springframework.content.rest.StoreRestResource;
import org.springframework.stereotype.Service;

@Service
@StoreRestResource(path = "media")
public interface MediaStore extends ContentStore<MediaInfo, String> {
}
