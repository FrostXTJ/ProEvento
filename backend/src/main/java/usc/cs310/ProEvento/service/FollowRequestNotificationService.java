package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.FollowRequestNotificationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.FollowRequestNotification;

import java.util.List;

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
}
