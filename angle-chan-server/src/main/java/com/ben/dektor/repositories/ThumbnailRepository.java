package com.ben.dektor.repositories;

import com.ben.dektor.entities.MediaInfo;
import com.ben.dektor.entities.Thumbnail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThumbnailRepository  extends JpaRepository<Thumbnail, Long> {
}
