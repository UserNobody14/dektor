package com.ben.dektor.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class CatalogThread {
//    TODO: make the thread subdivided under boards & posts also subdivided (to prevent overuse/concurrency?)
    @Id
    private long number;
    private String subject;
//    @OneToOne()
//    private Post originalPost;
    @ManyToMany()
    private List<Post> posts;
    private String board;
}
