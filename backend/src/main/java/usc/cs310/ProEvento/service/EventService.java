package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.EventDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventDao eventDao;

    @Autowired
    private UserDao userDao;

    public boolean hostEvent(Event event) {
        // Event name cannot be empty.
        if (event.getName() == null || event.getName().equals("")) {
            return false;
        }
        if (event.getHost() == null
           || userDao.selectUserById(event.getHost().getId()) == null) {
            return false;
        }
        event.setStatus("open for registration");
        return eventDao.createEvent(event);
    }

    public Event getEventById(long eventId) {
        return eventDao.selectEventById(eventId);
    }

    public List<Event> getEventsByName(String name) {
        return eventDao.selectEventsByName(name);
    }

    public List<Event> getUserRegisteredEvents(long userId) {
        User user = userDao.selectUserById(userId);
        if (user != null) {
            return new ArrayList<>(user.getRegisteredEvents());
        }
        return Collections.emptyList();
    }

    public List<Event> getUserHostEvents(long userId) {
        User user = userDao.selectUserById(userId);
        if (user != null) {
            return new ArrayList<>(user.getHostEvents());
        }
        return Collections.emptyList();
    }

    public List<Event> getAllEvents() {
        return eventDao.selectAllEvents();
    }

    public boolean startEvent(long eventId) {
        Event event = eventDao.selectEventById(eventId);
        if (event != null) {
            event.setStatus("streaming");
            return eventDao.updateEvent(event);
        }
        return false;
    }

    public boolean endEvent(long eventId) {
        Event event = eventDao.selectEventById(eventId);
        if (event != null) {
            event.setStatus("ended");
            return eventDao.updateEvent(event);
        }
        return false;
    }

    public boolean cancelEvent(long eventId) {
        Event event = eventDao.selectEventById(eventId);
        if (event != null) {
            event.setStatus("cancelled");
            return eventDao.updateEvent(event);
        }
        return false;
    }

    public boolean userRegisterEvent(long userId, long eventId) {
        User user = userDao.selectUserById(userId);
        Event event = eventDao.selectEventById(eventId);
        if (user != null && event != null) {
            user.registerEvent(event);
            return userDao.updateUser(user);
        }
        return false;
    }

    public boolean userUnregisterEvent(long userId, long eventId) {
        User user = userDao.selectUserById(userId);
        Event event = eventDao.selectEventById(eventId);
        if (user != null && event != null) {
            user.unregisterEvent(event);
            return userDao.updateUser(user);
        }
        return false;
    }

    public boolean userJoinEvent(long userId, long eventId) {
        User user = userDao.selectUserById(userId);
        Event event = eventDao.selectEventById(eventId);
        if (user != null && event != null
        && event.getStatus().equals("streaming")
        && user.getRegisteredEvents().contains(event)) {
            user.joinEvent(event);
            return userDao.updateUser(user);
        }
        return false;
    }

    public boolean userLeaveEvent(long userId, long eventId) {
        User user = userDao.selectUserById(userId);
        Event event = eventDao.selectEventById(eventId);
        if (user != null && user.getCurrentEvent().equals(event)) {
            user.leaveEvent(event);
            return userDao.updateUser(user);
        }
        return false;
    }
}
