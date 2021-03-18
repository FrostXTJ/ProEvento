package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.User;
import usc.cs310.ProEvento.service.EventService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/api/event")
    public Event getEventById(@RequestParam long eventId,
                              HttpServletRequest request,
                              HttpServletResponse response) {
        Event event = eventService.getEventById(eventId);
        if (event == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return event;
    }

    @GetMapping("/api/event/events_by_name")
    public List<Event> getEventsByName(@RequestParam String name) {
        return eventService.getEventsByName(name);
    }

    @GetMapping("/api/event/user_registered_events")
    public List<Event> getUserRegisteredEvents(@RequestParam long userId) {
        return eventService.getUserRegisteredEvents(userId);
    }

    @GetMapping("/api/event/user_host_events")
    public List<Event> getUserHostEvents(@RequestParam long userId) {
        return eventService.getUserHostEvents(userId);
    }

    @GetMapping("/api/event/all_events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
}
