package com.ben.dektor.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.content.fs.config.EnableFilesystemStores
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.client.RestTemplate


//import org.h2.server.web.WebServlet;
@Configuration
@EnableWebSecurity
@EnableAsync
@EnableFilesystemStores(basePackages = ["com.ben.dektor.store"])
open class WebSecurity(
        @Autowired
        private val userDetailsService: UserDetailsServiceImpl
) : WebSecurityConfigurerAdapter() {



    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.DELETE, "/admin/**")
                .hasAuthority("ADMINISTRATOR")
                .anyRequest().permitAll()
                .and()
                .addFilter(JWTAuthenticationFilter(authenticationManager()))
                .addFilter(JWTAuthorizationFilter(authenticationManager(), userDetailsService))
    }

    @Bean
    fun restTemplate(builder: RestTemplateBuilder): RestTemplate? {
        // Do any additional configuration here
        return builder.build()
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
//    @Bean
//    open fun filesystemRoot(): File? {
//        try {
//            return Files.createTempDirectory("").toFile()
//        } catch (ioe: IOException) {
//        }
//        return null
//    }
//
//    @Bean
//    open fun fileSystemResourceLoader(): FileSystemResourceLoader {
//        return FileSystemResourceLoader(filesystemRoot()!!.absolutePath)
//    }
}