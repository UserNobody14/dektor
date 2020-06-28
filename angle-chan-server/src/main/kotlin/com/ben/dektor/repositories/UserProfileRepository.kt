package com.ben.dektor.repositories

import com.ben.dektor.entities.UserProfile
import org.springframework.data.jpa.repository.JpaRepository

interface UserProfileRepository : JpaRepository<UserProfile, String>