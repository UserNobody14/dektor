package com.ben.dektor.rest;

import com.ben.dektor.entities.CatalogThread;
import com.ben.dektor.repositories.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/thread")
public class ThreadController {
    @Autowired
    private
    ThreadRepository threadRepository;
    @GetMapping(path = "/{number}")
    public CatalogThread expFile(@PathVariable Long number) {
//        System.out.println("here I am");
        return threadRepository.findById(number).get();
    }
    @PostMapping("/sendOTP")
    public String sendOTP() {
        return "OTP sent";
    };

}
