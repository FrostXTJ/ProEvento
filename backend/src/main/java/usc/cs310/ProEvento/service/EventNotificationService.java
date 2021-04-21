package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.EventDao;
import usc.cs310.ProEvento.dao.EventNotificationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.EventNotification;
import usc.cs310.ProEvento.model.User;

import java.util.List;
import java.util.Set;

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

    public List<EventNotification> getEventNotificationByReceiverId(long id) {
        return eventNotificationDao.selectEventNotificationByReceiverId(id);
    }

    public boolean deleteEventNotification(EventNotification notification) {
        return eventNotificationDao.deleteEventNotification(notification);
    }
    public EventNotification getEventNotificationById(long id){
        return eventNotificationDao.selectEventNotificationById(id);
    }

    public boolean removeEventNotificationReceiver(long userId, long notificationId) {
        User user = userDao.selectUserById(userId);
        EventNotification notification = eventNotificationDao.selectEventNotificationById(notificationId);
        if (user == null || notification == null || !notification.getReceivers().contains(user)) {
            return false;
        }
        Set<User> receivers = notification.getReceivers();
        receivers.remove(user);
        notification.setReceivers(receivers);
        return eventNotificationDao.updateEventNotification(notification);
    }
}
