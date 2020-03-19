package com.ben.dektor.security


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
//import org.springframework.boot.context.properties.*

//@ConstructorBinding
@ConfigurationProperties(prefix = "google.recaptcha.key")
class CaptchaSettings (
//    val site: String,
//    val secret: String // standard getters and setters
)