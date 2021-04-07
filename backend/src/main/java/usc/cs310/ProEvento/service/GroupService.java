package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.GroupDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.Group;
import usc.cs310.ProEvento.model.User;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupDao groupDao;

    @Autowired
    private UserDao userDao;

    public boolean createGroup(Group group) {
        // Group name cannot be empty.
        if (group.getName() == null || group.getName().equals("")) {
            return false;
        }
        if (group.getFounder() == null
                || userDao.selectUserById(group.getFounder().getId()) == null) {
            return false;
        }
        return groupDao.createGroup(group);
    }

    public Group getGroupById(long groupId) {
        return groupDao.selectGroupById(groupId);
    }

    public List<Group> getGroupsByName(String name) {
        return groupDao.selectGroupsByName(name);
    }

    public List<Group> getGroupsByMember(long userId) {
        List<Group> groups = groupDao.selectGroupsByMemberId(userId);
        return groups;
    }

    public List<Group> getGroupsByFounder(long userId) {
        List<Group> groups = groupDao.selectGroupsByFounderId(userId);
        return groups;
    }

    public List<Group> getAllGroups() {
        return groupDao.selectAllGroups();
    }

    public boolean addUserToGroup(long userId, long groupId) {
        User user = userDao.selectUserById(userId);
        Group group = groupDao.selectGroupById(groupId);
        if (user != null && group != null) {
            group.addMember(user);
            return groupDao.updateGroup(group);
        }
        return false;
    }

    public boolean removeUserFromGroup(long userId, long groupId) {
        User user = userDao.selectUserById(userId);
        Group group = groupDao.selectGroupById(groupId);
        if (user != null && group != null) {
            group.removeMember(user);
            return groupDao.updateGroup(group);
        }
        return false;
    }
}
