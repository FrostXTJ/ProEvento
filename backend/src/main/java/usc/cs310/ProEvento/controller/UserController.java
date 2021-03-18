package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.User;
import usc.cs310.ProEvento.model.requestbody.FollowRequestBody;
import usc.cs310.ProEvento.model.requestbody.UserSetTagRequestBody;
import usc.cs310.ProEvento.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/api/user")
    public User getUserById(@RequestParam long userId,
                            HttpServletRequest request,
                            HttpServletResponse response) {
        User user = userService.getUserBydId(userId);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return user;
    }

    @GetMapping("/api/user/users_by_name")
    public List<User> getUsersByName(@RequestParam String username) {
        List<User> users = userService.getUsersByName(username);
        return users;
    }

    @GetMapping("/api/user/followers")
    public List<User> getFollowersById(@RequestParam long userId) {
        List<User> followers = userService.getFollowersById(userId);
        return followers;
    }

    @GetMapping("/api/user/following")
    public List<User> getFollowingById(@RequestParam long userId) {
        List<User> following = userService.getFollowingById(userId);
        return following;
    }

    @PostMapping("/api/user/follow")
    public boolean follow(@RequestBody FollowRequestBody requestBody,
                                  HttpServletRequest request,
                                  HttpServletResponse response) {
        boolean success = userService.followUser(
                requestBody.followerId,
                requestBody.followeeId
        );
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }

    @PostMapping("/api/user/unfollow")
    public boolean unfollow(@RequestBody FollowRequestBody requestBody,
                          HttpServletRequest request,
                          HttpServletResponse response) {
        boolean success = userService.unfollowUser(
                requestBody.followerId,
                requestBody.followeeId
        );
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }

    @PostMapping("api/user/add_tag")
    public boolean addTag(@RequestBody UserSetTagRequestBody requestBody,
                          HttpServletRequest request,
                          HttpServletResponse response) {
        boolean success = userService.addTag(
                requestBody.userId,
                requestBody.tagId
        );
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }

    @PostMapping("api/user/remove_tag")
    public boolean removeTag(@RequestBody UserSetTagRequestBody requestBody,
                          HttpServletRequest request,
                          HttpServletResponse response) {
        boolean success = userService.removeTag(
                requestBody.userId,
                requestBody.tagId
        );
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }
}
