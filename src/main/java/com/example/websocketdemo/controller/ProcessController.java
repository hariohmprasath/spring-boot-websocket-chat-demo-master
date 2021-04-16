package com.example.websocketdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProcessController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/status")
    public void sendMessage(@RequestParam(value = "processId", defaultValue = "1234") String processId) {
        simpMessagingTemplate.convertAndSend("/topic/status/"+processId, "Your process "+processId+" is complete now");
    }
}
