package com.ben.dektor.service

import com.ben.dektor.entities.GoogleResponse
import com.ben.dektor.error.ReCaptchaInvalidException
import com.ben.dektor.error.ReCaptchaUnavailableException
import com.ben.dektor.security.CaptchaSettings
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestOperations
import org.springframework.web.client.RestTemplate
import java.net.URI
import java.util.regex.Pattern
import javax.servlet.http.HttpServletRequest

@Service
class CaptchaService (
        @Autowired
        val request: HttpServletRequest,
        @Autowired
val reCaptchaAttemptService: ReCaptchaAttemptService,
@Autowired
val restTemplate: RestTemplate
): ICaptchaService {
    @Value("\${google.recaptcha.key.site}")
    lateinit var site: String
    @Value("\${google.recaptcha.key.secret}")
    lateinit var secret: String
    override val reCaptchaSite: String?
        get() = site
    override val reCaptchaSecret: String?
        get() = secret

    @Throws(ReCaptchaInvalidException::class)
    override fun processResponse(response: String?)  {
        LOGGER.debug("Attempting to validate response {}", response)
        if (reCaptchaAttemptService.isBlocked(clientIP)) {
            throw ReCaptchaInvalidException("Client exceeded maximum number of failed attempts")
        }
        if (!responseSanityCheck(response)) {
            throw ReCaptchaInvalidException("Response contains invalid characters")
        }
        LOGGER.info("secret: $reCaptchaSecret\n response: $response\n site: $site")

        val verifyUri = URI.create(String.format("https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s&remoteip=%s", reCaptchaSecret, response, clientIP))
        try {
            val googleResponse = restTemplate.getForObject(verifyUri, GoogleResponse::class.java) ?: throw ReCaptchaUnavailableException("Registration unavailable at this time.  Please try again later.")
            LOGGER.debug("Google's response: {} ", googleResponse.toString())
            if (!googleResponse.success) {
                if (googleResponse.hasClientError()) {
                    reCaptchaAttemptService.reCaptchaFailed(clientIP)
                }
                throw ReCaptchaInvalidException("reCaptcha was not successfully validated")
            }
        } catch (rce: RestClientException) {
            throw ReCaptchaUnavailableException("Registration unavailable at this time.  Please try again later.", rce)
        }
        reCaptchaAttemptService.reCaptchaSucceeded(clientIP)
    }

    private fun responseSanityCheck(response: String?): Boolean {
        return StringUtils.hasLength(response) && RESPONSE_PATTERN.matcher(response?: return false).matches()
    }

//    override fun getReCaptchaSite(): String? {
//        return captchaSettings!!.site!!
//    }

//    override fun getReCaptchaSecret(): String {
//        return captchaSettings!!.secret!!
//    }

    private val clientIP: String
        private get() {
            val xfHeader = request.getHeader("X-Forwarded-For") ?: return request.remoteAddr
            return xfHeader.split(",").toTypedArray()[0]
        }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(CaptchaService::class.java)
        private val RESPONSE_PATTERN = Pattern.compile("[A-Za-z0-9_-]+")
    }
}