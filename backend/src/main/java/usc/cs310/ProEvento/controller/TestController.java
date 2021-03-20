package usc.cs310.ProEvento.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public String testConnection() {
        return "Connected to the ProEvento server!";
    }
}
