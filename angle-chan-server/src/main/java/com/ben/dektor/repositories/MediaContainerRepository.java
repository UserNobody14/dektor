package com.ben.dektor.repositories;

import com.ben.dektor.entities.MediaContainer;
import com.ben.dektor.entities.MediaInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaContainerRepository extends JpaRepository<MediaContainer, Long> {
}
