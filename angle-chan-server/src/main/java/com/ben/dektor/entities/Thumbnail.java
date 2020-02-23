package com.ben.dektor.entities;

import lombok.Data;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
public class Thumbnail {
    private @Id long link;
    private Long height;
    private Long width;

    // Spring Content managed attributes
    private @ContentId
    String contentId;
    private @ContentLength
    Long contentLen;
    @MimeType private String mimeType = "text/plain";
}
