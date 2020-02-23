package com.ben.dektor.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class MediaContainer {
    @Id @GeneratedValue
private Long id;
    @OneToOne(cascade = CascadeType.ALL)
private MediaInfo info;
    @OneToOne(cascade = CascadeType.ALL)
private Thumbnail thumbnail;
private String mediaSizeKb;
private String title;
private String mediaType;
}
