package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.requestbody.UserEventRequestBody;
import usc.cs310.ProEvento.service.EventService;

import java.util.List;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/api/event")
    public Event getEventById(@RequestParam long eventId) {
        Event event = eventService.getEventById(eventId);
        return event;
    }

    @GetMapping("/api/event/events_by_name")
    public List<Event> getEventsByName(@RequestParam String name) {
        return eventService.getEventsByName(name);
    }

    @GetMapping("/api/event/events_by_date")
    public List<Event> getEventsByDate(@RequestParam String date) {
        return eventService.getEventByDate(date);
    }

    @GetMapping("/api/event/user_current_event")
    public Event getUserCurrentEvent(@RequestParam long userId) {
        return eventService.getUserCurrentEvent(userId);
    }

    @GetMapping("/api/event/user_registered_events")
    public List<Event> getUserRegisteredEvents(@RequestParam long userId) {
        return eventService.getUserRegisteredEvents(userId);
    }

    @GetMapping("/api/event/user_host_events")
    public List<Event> getUserHostEvents(@RequestParam long userId) {
        List<Event> events = eventService.getUserHostEvents(userId);
        return events;
    }

    @GetMapping("/api/event/all_events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PostMapping("/api/event/host")
    public String hostEvent(@RequestBody Event event) {
        if (eventService.hostEvent(event)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/start")
    public String startEvent(@RequestBody Event event) {
        if (eventService.startEvent(event.getId())) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/end")
    public String endEvent(@RequestBody Event event) {
        if (eventService.endEvent(event.getId())) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/cancel")
    public String cancelEvent(@RequestBody Event event) {
        if (eventService.cancelEvent(event.getId())) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/register")
    public String userRegisterEvent(@RequestBody UserEventRequestBody requestBody) {
        if (eventService.userRegisterEvent(requestBody.userId, requestBody.eventId)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/unregister")
    public String userUnregisterEvent(@RequestBody UserEventRequestBody requestBody) {
        if (eventService.userUnregisterEvent(requestBody.userId, requestBody.eventId)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/join")
    public String userJoinEvent(@RequestBody UserEventRequestBody requestBody) {
        if (eventService.userJoinEvent(requestBody.userId, requestBody.eventId)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/event/leave")
    public String userLeaveEvent(@RequestBody UserEventRequestBody requestBody) {
        if (eventService.userLeaveEvent(requestBody.userId, requestBody.eventId)) {
            return "success";
        }
        return "failure";
    }
}
