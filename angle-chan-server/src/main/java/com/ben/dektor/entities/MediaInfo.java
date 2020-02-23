package com.ben.dektor.entities;

import lombok.Data;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class MediaInfo {
    @Id private long link;
    private Long height;
    private Long width;
    @ContentId private String contentId;
    @ContentLength private Long contentLength;
    @MimeType private String mimeType = "text/plain";
}
