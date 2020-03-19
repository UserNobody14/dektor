package com.ben.dektor.entities

import com.fasterxml.jackson.annotation.*
import lombok.Data
import java.util.*

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder("success", "challenge_ts", "hostname", "error-codes")

data class GoogleResponse(
        @JsonProperty("success")
        var success: Boolean = false,

        @JsonProperty("challenge_ts")
var challengeTs: String,

@JsonProperty("hostname")
var hostname: String,

@JsonProperty("error-codes")
var errorCodes: Array<ErrorCode>?
) {

    @JsonIgnore
    fun hasClientError(): Boolean {
        val errors: Array<ErrorCode> = errorCodes ?: return false
        for (error in errors) {
            when (error) {
                ErrorCode.InvalidResponse, ErrorCode.MissingResponse -> return true
            }
        }
        return false
    }

    enum class ErrorCode {
        MissingSecret, InvalidSecret, MissingResponse, InvalidResponse;

        companion object {
            var errorsMap: MutableMap<String, ErrorCode> = HashMap(4)

            @JsonCreator
            fun forValue(value: String): ErrorCode? {
                return errorsMap[value.toLowerCase()]
            }

            init {
                errorsMap["missing-input-secret"] = MissingSecret
                errorsMap["invalid-input-secret"] = InvalidSecret
                errorsMap["missing-input-response"] = MissingResponse
                errorsMap["invalid-input-response"] = InvalidResponse
            }
        }
    } // standard getters and setters
}