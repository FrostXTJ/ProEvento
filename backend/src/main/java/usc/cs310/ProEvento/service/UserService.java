package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public User getUserBydId(long userId) {
        return userDao.selectUserById(userId);
    }

    public List<User> getUsersByName(String username) {
        return userDao.selectUsersByName(username);
    }

    public List<User> getFollowing(long userId) {
        User user = userDao.selectUserById(userId);
        return new ArrayList<>(user.getFollowing());
    }

    public List<User> getFollowers(long userId) {
        User user = userDao.selectUserById(userId);
        return new ArrayList<>(user.getFollowers());
    }

    public boolean followUser(long usedOneId, long userTwoId) {
        User userOne = userDao.selectUserById(usedOneId);
        User userTwo = userDao.selectUserById(userTwoId);
        userOne.follow(userTwo);
        return userDao.updateUser(userOne);
    }

    public boolean unfollowUser(long usedOneId, long userTwoId) {
        User userOne = userDao.selectUserById(usedOneId);
        User userTwo = userDao.selectUserById(userTwoId);
        if (userOne.getFollowing().contains(userTwo)) {
            userOne.unfollow(userTwo);
            return userDao.updateUser(userOne);
        }
        return false;
    }
}
