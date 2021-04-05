package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.User;
import usc.cs310.ProEvento.model.requestbody.FollowRequestBody;
import usc.cs310.ProEvento.model.requestbody.UserSetTagRequestBody;
import usc.cs310.ProEvento.service.UserService;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/api/user")
    public User getUserById(@RequestParam long userId) {
        User user = userService.getUserBydId(userId);
        return user;
    }

    @GetMapping("/api:/user/users_by_name")


    public List<User> getUsersByName(@RequestParam String username) {
        return userService.getUsersByName(username);
    }

    @GetMapping("/api/user/followers")
    public List<User> getFollowersById(@RequestParam long userId) {
        return userService.getFollowersById(userId);
    }

    @GetMapping("/api/user/following")
    public List<User> getFollowingById(@RequestParam long userId) {
        return userService.getFollowingById(userId);
    }

    @PostMapping("/api/user/follow")
    public String follow(@RequestBody FollowRequestBody requestBody) {
        boolean success = userService.followUser(
                requestBody.followerId,
                requestBody.followeeId
        );
        if (success) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/user/unfollow")
    public String unfollow(@RequestBody FollowRequestBody requestBody) {
        boolean success = userService.unfollowUser(
                requestBody.followerId,
                requestBody.followeeId
        );
        if (success) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("api/user/add_tag")
    public String addTag(@RequestBody UserSetTagRequestBody requestBody) {
        boolean success = userService.addTag(
                requestBody.userId,
                requestBody.tagId
        );
        if (success) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("api/user/remove_tag")
    public String removeTag(@RequestBody UserSetTagRequestBody requestBody) {
        boolean success = userService.removeTag(
                requestBody.userId,
                requestBody.tagId
        );
        if (success) {
            return "success";
        }
        return "failure";
    }
}
