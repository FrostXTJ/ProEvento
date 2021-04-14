package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.GroupRequestNotificationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.GroupRequestNotification;

import java.util.List;

@Service
public class GroupRequestNotificationService {
    @Autowired
    GroupRequestNotificationDao groupRequestNotificationDao;

    @Autowired
    UserDao userDao;

    public boolean sendGroupRequestNotification(GroupRequestNotification notification) {

        if (notification == null || notification.getSender() == null
                || notification.getReceivers() == null
                || notification.getReceivers().size() == 0
                || userDao.selectUserById(notification.getSender().getId()) == null
        ) {
            return false;
        } else {
            return groupRequestNotificationDao.createGroupRequestNotification(notification);
        }
    }

    public List<GroupRequestNotification> getGroupRequestNotificationByReceiverId(long id) {
        return groupRequestNotificationDao.getGroupRequestNotificationByReceiverId(id);
    }

    public boolean deleteGroupRequestNotification(GroupRequestNotification notification) {
        return groupRequestNotificationDao.deleteGroupRequestNotification(notification);
    }
}
