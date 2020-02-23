package com.ben.dektor.repositories;

import com.ben.dektor.entities.MediaInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaInfoRepository extends JpaRepository<MediaInfo, Long> {
}
