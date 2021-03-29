package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.Tag;
import usc.cs310.ProEvento.model.User;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EventServiceTest {
    @Autowired
    private EventService eventService;
    @Autowired
    private TagService tagService;
    @Autowired
    private UserService userService;

    @Test
    public void testSearchByEventName()
    {
        String name = "CSCI";
        List<Event> eventList = eventService.getEventsByName(name);
        int before_size = eventList.size();
        Event event = new Event();
        event.setName("CSCI310 is a very good class");
        event.setThumbnailUrl("");
        event.setDescription("I am writing test cases for CSCI 310 right now, come help me!");
        Tag tag = tagService.getTagById(1);
        event.setTag(tag);
        User user = userService.getUserBydId(1);
        event.setHost(user);
        event.setDateTime(LocalDateTime.of(2020,12,1, 12,30));
        eventService.hostEvent(event);
        eventList = eventService.getEventsByName(name);
        int after_size = eventList.size();

        Assertions.assertEquals(1, after_size - before_size);
    }
}