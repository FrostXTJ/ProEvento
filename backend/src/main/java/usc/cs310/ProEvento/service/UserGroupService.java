package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.UserGroupDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.UserGroup;
import usc.cs310.ProEvento.model.User;

import java.util.List;

@Service
public class UserGroupService {

    @Autowired
    private UserGroupDao userGroupDao;

    @Autowired
    private UserDao userDao;

    public boolean createGroup(UserGroup userGroup) {
        // Group name cannot be empty.
        if (userGroup.getName() == null || userGroup.getName().equals("")) {
            return false;
        }
        if (userGroup.getFounder() == null
                || userDao.selectUserById(userGroup.getFounder().getId()) == null) {
            return false;
        }
        return userGroupDao.createGroup(userGroup);
    }

    public UserGroup getGroupById(long groupId) {
        return userGroupDao.selectGroupById(groupId);
    }

    public List<UserGroup> getGroupsByName(String name) {
        return userGroupDao.selectGroupsByName(name);
    }

    public List<UserGroup> getGroupsByMember(long userId) {
        List<UserGroup> userGroups = userGroupDao.selectGroupsByMemberId(userId);
        return userGroups;
    }

    public List<UserGroup> getGroupsByFounder(long userId) {
        List<UserGroup> userGroups = userGroupDao.selectGroupsByFounderId(userId);
        return userGroups;
    }

    public List<UserGroup> getAllGroups() {
        return userGroupDao.selectAllGroups();
    }

    public boolean addUserToGroup(long userId, long groupId) {
        User user = userDao.selectUserById(userId);
        UserGroup userGroup = userGroupDao.selectGroupById(groupId);
        if (user != null && userGroup != null) {
            userGroup.addMember(user);
            return userGroupDao.updateGroup(userGroup);
        }
        return false;
    }

    public boolean removeUserFromGroup(long userId, long groupId) {
        User user = userDao.selectUserById(userId);
        UserGroup userGroup = userGroupDao.selectGroupById(groupId);
        if (user != null && userGroup != null) {
            userGroup.removeMember(user);
            return userGroupDao.updateGroup(userGroup);
        }
        return false;
    }
}
