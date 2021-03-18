package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.User;
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
}
