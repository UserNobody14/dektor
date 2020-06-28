package com.ben.dektor.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.algorithms.Algorithm.HMAC512
import com.ben.dektor.entities.UserProfile
import com.ben.dektor.security.SecurityConstants.EXPIRATION_TIME
import com.ben.dektor.security.SecurityConstants.HEADER_STRING
import com.ben.dektor.security.SecurityConstants.SECRET
import com.ben.dektor.security.SecurityConstants.TOKEN_PREFIX
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


object SecurityConstants {
    const val SECRET = "SecretKeyToGenJWTs"
    const val EXPIRATION_TIME: Long = 864000000 // 10 days
    const val TOKEN_PREFIX = "Bearer "
    const val HEADER_STRING = "Authorization"
    const val SIGN_UP_URL = "/users/sign-up"
}


class JWTAuthenticationFilter(authenticationManager: AuthenticationManager
) : UsernamePasswordAuthenticationFilter() {
//    override val a: AuthenticationManager = TODO()

    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(req: HttpServletRequest,
                                       res: HttpServletResponse?): Authentication {
        return try {
            val creds: UserProfile = ObjectMapper()
                    .readValue(req.getInputStream(), UserProfile::class.java)
            authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            ArrayList() //(creds.getAuthorityr() != null) ? Collections.singletonList(new Authority(creds.getAuthorityr())):
                            //Collections.emptyList()
                            //creds.getAuthorities()
                    )
            )
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
    }

    @Throws(IOException::class, ServletException::class)
    override fun successfulAuthentication(req: HttpServletRequest?,
                                          res: HttpServletResponse,
                                          chain: FilterChain?,
                                          auth: Authentication) {
        val token: String = JWT.create()
                .withSubject((auth.getPrincipal() as UserProfile).getUsername()) //.withClaim("authorityr", ((ApplicationUser) auth.getPrincipal()).getAuthorityr())
                .withExpiresAt(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET))
        res.addHeader(HEADER_STRING, TOKEN_PREFIX.toString() + token)
        //TODO: remove in any real security situation.
        res.addHeader("Access-Control-Expose-Headers", HEADER_STRING)
    }

}

class JWTAuthorizationFilter(
        authManager: AuthenticationManager?,
        private val userDetailsService: UserDetailsServiceImpl) : BasicAuthenticationFilter(authManager) {
//    private val userDetailsService: UserDetailsServiceImpl = userDetailsService

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(req: HttpServletRequest,
                                  res: HttpServletResponse,
                                  chain: FilterChain) {
        val header = req.getHeader(HEADER_STRING)
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res)
            return
        }
        val authentication = getAuthentication(req)
        if (authentication == null) {
            println("BAD NULL AUTHENTICATE RIGHT NOW")
        }
        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(req, res)
    }

    //MOST IMPORTANT!
    //From with in the filter stack, alters the security context and allows it to move on assuming it is correct.
    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(HEADER_STRING)
        if (token != null) {
            val general = JWT.require(Algorithm.HMAC512(SECRET)) //.withClaim("authorities", "ROLE_GUEST")
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .subject
            println("Reached some kinda position")
            if (general != null) {
                println(general)
                return authenticateFromName(general)
            }
            return null
        }
        return null
    }

    private fun authenticateFromName(name: String): UsernamePasswordAuthenticationToken {
        val appUser: UserDetails = userDetailsService.loadUserByUsername(name)
        if (appUser != null) {
            println("GOT THIS FAR, 'im at the UserDetails load part.")
        }
        //return new UsernamePasswordAuthenticationToken(name, null, new ArrayList<>());
        return UsernamePasswordAuthenticationToken(name, appUser.password, appUser.authorities)
    }

}