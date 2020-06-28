package com.ben.dektor.entities

import lombok.Data
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.io.Serializable
import java.util.*
import javax.persistence.*


@Entity
@Table
data class UserProfile (
        @ElementCollection
        val authorities: List<String>,
        private val password: String,
        @Id
        private val username: String
) : UserDetails, Serializable {
//    protected constructor() {}

//    constructor(username: String, password: String, authorities: List<String>): this(
//            authorities,
//            password,
//            username
//    )


    override fun getUsername(): String {
//        TODO("Not yet implemented")
        return username
    }


    override fun getPassword(): String {
//        TODO("Not yet implemented")
        return password
    }

    /*
  @ManyToMany(fetch = FetchType.LAZY)(
  @JoinTable(name = "USERS_AUTHORITIES", joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID"))
  @OrderBy
  @JsonIgnore
  */
//    @Column(name = "authority")
//    private val authority: String? = null


    override fun isEnabled(): Boolean {
        return true
    }

    override fun getAuthorities(): Collection<SimpleGrantedAuthority> {
//        val a: ArrayList<*> = ArrayList<SimpleGrantedAuthority>()
//        a.add(SimpleGrantedAuthority(authority))
        return authorities.map { role -> SimpleGrantedAuthority(role) }
        //return new ArrayList<Authority>(Arrays.asList(new SimpleGrantedAuthority[] {new SimpleGrantedAuthority(this.authorityr)}));
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    } //end oddity
}