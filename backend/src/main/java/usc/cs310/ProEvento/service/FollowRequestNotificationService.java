package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.FollowRequestNotificationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.FollowRequestNotification;
import usc.cs310.ProEvento.model.User;

import java.util.List;
import java.util.Set;

@Service
public class FollowRequestNotificationService {
    @Autowired
    FollowRequestNotificationDao followRequestNotificationDao;

    @Autowired
    UserDao userDao;

    public boolean sendFollowRequestNotification(FollowRequestNotification notification){
        if (notification == null || notification.getSender() == null
                || notification.getReceivers() == null
                || notification.getReceivers().size() == 0
                || userDao.selectUserById(notification.getSender().getId()) == null
                ){
            return false;
        }
        else{
            return followRequestNotificationDao.createFollowRequestNotification(notification);
        }
    }

    public List<FollowRequestNotification> getFollowRequestsByReceiverId(long id){
        return followRequestNotificationDao.getFollowRequestByReceiverId(id);
    }

    public boolean deleteFollowRequestNotification(FollowRequestNotification notification) {
        return followRequestNotificationDao.deleteFollowRequest(notification);
    }

    public boolean removeFollowRequestReceiver(long userId, long notificationId) {
        User user = userDao.selectUserById(userId);
        FollowRequestNotification notification = followRequestNotificationDao.getFollowRequestNotificationById(notificationId);
        if (user == null || notification == null || !notification.getReceivers().contains(user)) {
            return false;
        }
        Set<User> receivers = notification.getReceivers();
        receivers.remove(user);
        notification.setReceivers(receivers);
        return followRequestNotificationDao.updateFollowRequest(notification);
    }
}
