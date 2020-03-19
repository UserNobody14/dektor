package com.ben.dektor.service

import com.ben.dektor.error.ReCaptchaInvalidException

interface ICaptchaService {
    @Throws(ReCaptchaInvalidException::class)
    fun processResponse(response: String?): Unit
    val reCaptchaSite: String?
    val reCaptchaSecret: String?
}