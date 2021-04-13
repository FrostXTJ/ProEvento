package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.EventDao;
import usc.cs310.ProEvento.dao.EventNotificationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.EventNotification;

import java.util.List;

@Service
public class EventNotificationService {
    @Autowired
    private EventNotificationDao eventNotificationDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EventDao eventDao;

    public boolean sendEventNotification(EventNotification notification) {
        if (notification == null || notification.getSender() == null
                || notification.getReceivers() == null
                || notification.getReceivers().size() == 0
                || notification.getEvent() == null
                || userDao.selectUserById(notification.getSender().getId()) == null
                || eventDao.selectEventById(notification.getEvent().getId()) == null) {
            return false;
        } else {
            return eventNotificationDao.createEventNotification(notification);
        }
    }

    public EventNotification getEventNotificationById(long id) {
        return eventNotificationDao.selectEventNotificationById(id);
    }

    public List<EventNotification> getEventNotificationByReceiverId(long id) {
        return eventNotificationDao.selectEventNotificationByReceiverId(id);
    }

    public boolean deleteEventNotification(EventNotification notification) {
        return eventNotificationDao.deleteEventNotification(notification);
    }
}
