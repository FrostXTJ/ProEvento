package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.User;

@Service
public class UserBadgeService {
    @Autowired
    private UserDao userDao;

    public boolean addBadge(long userId, String badge) {
        User user = userDao.selectUserById(userId);
        if (user != null) {
            if (badge.equals("Fun") || badge.equals("fun")) {
                user.addFunBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Cool") || badge.equals("cool")) {
                user.addCoolBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Helpful") || badge.equals("helpful")) {
                user.addHelpfulBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Charming") || badge.equals("charming")) {
                user.addCharmingBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Awesome") || badge.equals("awesome")) {
                user.addAwesomeBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Energetic") || badge.equals("energetic")) {
                user.addEnergeticBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Smart") || badge.equals("smart")) {
                user.addSmartBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Dull") || badge.equals("dull")) {
                user.addDullBadge();
                return userDao.updateUser(user);
            } else if (badge.equals("Rude") || badge.equals("rude")) {
                user.addRudeBadge();
                return userDao.updateUser(user);
            }
            return false;
        }
        return false;
    }
}
