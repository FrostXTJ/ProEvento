package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.requestbody.UserBadgeRequestBody;
import usc.cs310.ProEvento.service.UserBadgeService;

@RestController
public class UserBadgeController {
    @Autowired
    private UserBadgeService userBadgeService;

    @PostMapping("/api/user/add_badge")
    public String AddBadge(@RequestBody UserBadgeRequestBody requestBody) {
        boolean success = userBadgeService.addBadge(requestBody.userId, requestBody.badge);
        if (success) {
            return "success";
        }
        return "failure";
    }
}
