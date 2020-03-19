package com.ben.dektor.entities

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToMany

@Entity
data class IpAddressInfo (
        @Id val ip: String,
        @OneToMany val posts: Set<Post>
)