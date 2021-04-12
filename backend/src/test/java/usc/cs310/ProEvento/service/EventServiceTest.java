package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.User;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EventServiceTest {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

//    @Test
//    public void testUsersCanJoinAnEvent() {
//        User user = userService.getUserBydId(3); // User "Neumann"
//        Event event = eventService.getEventById(16); // Event "Best Film Music"
//        user.joinEvent(event); // Join the event
//
//        // Test both users' current event and status.
//        Assertions.assertEquals("In an event", user.getStatus());
//        Assertions.assertEquals(event, user.getCurrentEvent());
//
//        user.leaveEvent(event);
//    }
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
