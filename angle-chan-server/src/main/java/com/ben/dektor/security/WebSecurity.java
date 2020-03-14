package com.ben.dektor.security;

//import org.h2.server.web.WebServlet;
import org.springframework.content.fs.config.EnableFilesystemStores;
import org.springframework.content.fs.io.FileSystemResourceLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;


@Configuration
@EnableWebSecurity
@EnableFilesystemStores(basePackages={"com.ben.dektor.store"})
public class WebSecurity extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().anyRequest().permitAll();
    }

//    @Bean
//    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
//        http.authorizeExchange().anyExchange().permitAll();
//        return http.build();
//    }
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        //will csrf interact poorly with js? should this be disabled?
//        http.authorizeRequests()//.authorizeRequests()
//                .antMatchers(HttpMethod.POST, "/users/sign-up", "/login").permitAll()
//                .antMatchers(HttpMethod.GET, "/users/sign-up", "/login").permitAll()
//                .antMatchers(HttpMethod.POST, "**/**").permitAll()
//                .anyRequest().permitAll()//.authenticated() //CHANGE THIS!
//                .and()
////                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
////                .addFilter(new JWTAuthorizationFilter(authenticationManager(), userDetailsService))
//                // this disables session creation on Spring Security
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        //http.formLogin()
//
//        //DISABLE THE FIVE ITEMS FOLLOWING IF ERRORS PERSIST!
//
//        // Exception Handling
//        http.exceptionHandling()
////                .authenticationEntryPoint(forbiddenEntryPoint)
//                .accessDeniedPage("/errors/403"); //create access denied point?
//
//        http.formLogin()
//                .loginPage("/login/form")
//                .loginProcessingUrl("/login")
//                .failureUrl("/login/form?error")
//                .usernameParameter("username")
//                .passwordParameter("password")
//                .defaultSuccessUrl("/default", true)
//                .permitAll();
//
//        // Logout
//        http.logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login/form?logout").deleteCookies("JSESSIONID").invalidateHttpSession(true)
//                .permitAll();
//
//        // remember me configuration
//        http.rememberMe().key("crudtest"); //.rememberMeParameter("_spring_security_remember_me");
//
//        // Anonymous
//        http.anonymous();
//
//    }

//    For allowing the h2 console?
//@Bean
//ServletRegistrationBean h2servletRegistration(){
//    ServletRegistrationBean registrationBean = new ServletRegistrationBean( new WebServlet());
//    registrationBean.addUrlMappings("/console/*");
//    return registrationBean;
//}


    @Bean
    File filesystemRoot() {
        try {
            return Files.createTempDirectory("").toFile();
        } catch (IOException ioe) {}
        return null;
    }

    @Bean
    FileSystemResourceLoader fileSystemResourceLoader() {
        return new FileSystemResourceLoader(filesystemRoot().getAbsolutePath());
    }
}
