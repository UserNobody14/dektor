package com.ben.dektor.entities;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class Post {
    @Id
    private long number;
    private String name;
    @CreationTimestamp
    private Date utc;
    private String text;
    @OneToMany(cascade = CascadeType.ALL)
    private List<MediaContainer> media;
    @ElementCollection
    private List<Long> replies;
}
