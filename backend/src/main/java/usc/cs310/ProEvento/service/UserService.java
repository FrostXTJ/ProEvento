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

    public List<User> getFollowingById(long userId) {
        User user = userDao.selectUserById(userId);
        return new ArrayList<>(user.getFollowing());
    }

    public List<User> getFollowersById(long userId) {
        User user = userDao.selectUserById(userId);
        return new ArrayList<>(user.getFollowers());
    }

    public boolean followUser(long followerId, long followeeId) {
        User follower = userDao.selectUserById(followerId);
        User followee = userDao.selectUserById(followeeId);
        follower.follow(followee);
        return userDao.updateUser(follower);
    }

    public boolean unfollowUser(long followerId, long followeeId) {
        User follower = userDao.selectUserById(followerId);
        User followee = userDao.selectUserById(followeeId);
        if (follower.getFollowing().contains(followee)) {
            follower.unfollow(followee);
            return userDao.updateUser(follower);
        }
        return false;
    }

    public boolean updateProfile(long userId, String username,
                                 String avatarUrl, String biography,
                                 String status, Boolean enableNotifications) {
        User user = userDao.selectUserById(userId);
        if (username != null || !username.equals("")) {
            user.setUsername(username);
        }
        if (avatarUrl != null || !avatarUrl.equals("")) {
            user.setAvatarUrl(avatarUrl);
        }
        if (biography != null || !biography.equals("")) {
            user.setBiography(biography);
        }
        if (status != null || !status.equals("")) {
            user.setStatus(status);
        }
        if (enableNotifications != null) {
            user.setEnableNotifications(enableNotifications);
        }
        return userDao.updateUser(user);
    }
}
