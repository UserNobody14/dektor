package com.ben.dektor.rest

import com.ben.dektor.error.ThreadNotFoundException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class ThreadNotFoundExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(ThreadNotFoundException::class)
    protected fun handleConflict(
            ex: ThreadNotFoundException, request: WebRequest): ResponseEntity<Any> {
        val bodyOfResponse = "This should be application specific"
        var headers = HttpHeaders();
        print("got here at the very least!");
        headers.set("thread-not-found-status", "true");
        return handleExceptionInternal(
                ex,
                bodyOfResponse,
                headers,
                HttpStatus.NOT_FOUND,
                request)
    }
}