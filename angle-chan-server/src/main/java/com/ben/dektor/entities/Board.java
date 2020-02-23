package com.ben.dektor.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Board {
    @Id
    private String boardName;
    private String boardDescription;

    //
}
