package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.Tag;
import usc.cs310.ProEvento.model.User;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
class EventServiceTest {
    @Autowired
    private EventService eventService;
    @Autowired
    private UserService userService;
    @Autowired
    private TagService tagService;

    @ParameterizedTest
    @ValueSource(strings = { "2021-03-27", "2021-04-01", "2021-05-01" })
    public void getEventsByDateValidInputTest(String dateString) {
        List<Event> results = eventService.getEventByDate(dateString);
        int year = Integer.parseInt(dateString.substring(0, 4));
        int month = Integer.parseInt(dateString.substring(5, 7));
        int day = Integer.parseInt(dateString.substring(8, 10));

        for (Event e : results) {
            Assertions.assertEquals(e.getDateTime().getYear(), year);
            Assertions.assertEquals(e.getDateTime().getMonthValue(), month);
            Assertions.assertEquals(e.getDateTime().getDayOfMonth(), day);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = { "", "xxxx-yy-zz", "1999/1/1" })
    public void getEventsByDateInvalidInputTest(String dateString) {
        // The service should return an empty list if the input is invalid.
        List<Event> results = eventService.getEventByDate(dateString);
        Assertions.assertEquals(results.size(), 0);
    }

    @ParameterizedTest
    @ValueSource(longs = { 1, 3, 5, 7, 9, 10, 15, 23 })
    public void startValidEventTest(long eventId) {
        Boolean success = eventService.startEvent(eventId);
        Event event = eventService.getEventById(eventId);
        Assertions.assertTrue(success);
        Assertions.assertEquals(event.getStatus(), "streaming");
    }

    @ParameterizedTest
    @ValueSource(longs = { -1, 0, -100 })
    public void startInvalidEventTest(long eventId) {
        Boolean success = eventService.startEvent(eventId);
        Assertions.assertFalse(success);
    }

    @ParameterizedTest
    @ValueSource(longs = { 1, 2, 3, 4, 5 })
    public void getUserHostEventsTest(long hostId) {
        List<Event> results = eventService.getUserHostEvents(hostId);
        for (Event e : results) {
            Assertions.assertEquals(e.getHost().getId(), hostId);
        }
    }

    @Test
    public void searchByEventNameTest() {
        String name = "CSCI";
        List<Event> eventList = eventService.getEventsByName(name);
        int before_size = eventList.size();
        Event event = new Event();
        event.setName("CSCI310 is a very good class");
        event.setCoverImageUrl("");
        event.setDescription("I am writing test cases for CSCI 310 right now, come help me!");
        Tag tag = tagService.getTagById(1);
        event.setTag(tag);
        User user = userService.getUserBydId(1);
        event.setHost(user);
        event.setDateTime(LocalDateTime.of(2020, 12, 1, 12, 30));
        eventService.hostEvent(event);
        eventList = eventService.getEventsByName(name);
        int after_size = eventList.size();

        Assertions.assertEquals(1, after_size - before_size);
    }

    @Test
    public void testUsersCanJoinAnEvent() {
        User user = userService.getUserBydId(3); // User "Neumann"
        Event event = eventService.getEventById(16); // Event "Best Film Music"
        user.joinEvent(event); // Join the event

        // Test both users' current event and status.
        Assertions.assertEquals("In an event", user.getStatus());
        Assertions.assertEquals(event, user.getCurrentEvent());
        user.leaveEvent(event);
    }

    @Test
    public void testUsersCanLeaveAnEvent() {
        User user = userService.getUserBydId(6); // User "Shannon"
        Event event = eventService.getEventById(10); // Event "Who am I?"
        user.joinEvent(event); // Event "Who am I?"

        // Test both users' current event and status.
        Assertions.assertEquals("In an event", user.getStatus());
        Assertions.assertEquals(event, user.getCurrentEvent());

        user.leaveEvent(event);
        Assertions.assertEquals("Free", user.getStatus());
        Assertions.assertEquals(null, user.getCurrentEvent());
    }
}
