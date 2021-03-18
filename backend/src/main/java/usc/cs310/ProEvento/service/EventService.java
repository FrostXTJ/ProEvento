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
}
