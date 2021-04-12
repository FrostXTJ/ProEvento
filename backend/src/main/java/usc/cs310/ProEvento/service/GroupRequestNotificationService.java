package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.GroupRequestNotificationDAO;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.GroupRequestNotification;

import java.util.List;

@Service
public class GroupRequestNotificationService {

    @Autowired
    GroupRequestNotificationDAO groupRequestNotificationDAO;

    @Autowired
    UserDao userDao;

    public boolean sendGroupRequestNotification(GroupRequestNotification notification){

        if (notification == null || notification.getSender() == null
                || notification.getReceivers() == null
                || notification.getReceivers().size() == 0
                || userDao.selectUserById(notification.getSender().getId()) == null
        ){
            return false;
        }
        else{

            return groupRequestNotificationDAO.createGroupRequestNotification(notification);
        }
    }

    public List<GroupRequestNotification> getGroupRequestNotificationByReceiverId(long id){

        return groupRequestNotificationDAO.getGroupRequestNotificationByReceiverId(id);
    }
}
