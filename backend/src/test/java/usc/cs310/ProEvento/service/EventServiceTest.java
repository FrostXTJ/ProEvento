package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Event;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EventServiceTest {
    @Autowired
    private EventService eventService;
}