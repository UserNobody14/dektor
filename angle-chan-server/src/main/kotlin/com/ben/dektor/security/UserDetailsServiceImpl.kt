package com.ben.dektor.security

import com.ben.dektor.entities.UserProfile
import com.ben.dektor.repositories.UserProfileRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
@Component
class UserDetailsServiceImpl(
        @Autowired
        private val applicationUserRepository: UserProfileRepository
) : UserDetailsService {
    //@Autowired
    //private WebApplicationContext applicationContext;
    //@Autowired

    //TODO: add in thymeleaf and webpack and such from
    //IDEA: extend this to create host vs. guest permissions? org.springframework.security.acls.domain.AbstractPermission
    //    public UserDetailsServiceImpl() {
    //        super();
    //    }
    //    @PostConstruct
    //    public void completeSetup() {
    //        applicationUserRepository = applicationContext.getBean(ApplicationUserRepository.class);
    //    }
    @Transactional(readOnly = true)
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        return applicationUserRepository.findById(username).orElseThrow { throw UsernameNotFoundException(username) }

        //return new ApplicationUser(applicationUser.getUsername(), applicationUser.getPassword(), applicationUser.getAuthorityr());
    }

//    init {
//        this.applicationUserRepository = applicationUserRepository
//    }
}