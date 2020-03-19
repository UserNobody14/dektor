package com.ben.dektor.service

import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import com.google.common.cache.LoadingCache
import org.springframework.stereotype.Service
import java.util.concurrent.TimeUnit

@Service("reCaptchaAttemptService")
class ReCaptchaAttemptService {
    private val MAX_ATTEMPT = 4
    private val attemptsCache: LoadingCache<String, Int> = CacheBuilder
            .newBuilder()
            .expireAfterWrite(4, TimeUnit.HOURS)
            .build(object : CacheLoader<Any, Int>() {
        override fun load(key: Any): Int {
            return 0
        }
    })

    fun reCaptchaSucceeded(key: Any) {
        attemptsCache.invalidate(key)
    }

    fun reCaptchaFailed(key: String) {
        var attempts = attemptsCache.getUnchecked(key)
        attempts++
        attemptsCache.put(key, attempts)
    }

    fun isBlocked(key: String): Boolean {
        return attemptsCache.getUnchecked(key) >= MAX_ATTEMPT
    }

}