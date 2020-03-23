package com.ben.dektor.entities

import lombok.Data
import javax.persistence.Entity
import javax.persistence.Id


@Entity
data class Board (
    @Id
    var boardName: String
//    var boardDescription: String //
)