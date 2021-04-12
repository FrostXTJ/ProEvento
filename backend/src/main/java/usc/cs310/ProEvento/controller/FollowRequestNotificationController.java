package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.FollowRequestNotification;
import usc.cs310.ProEvento.service.FollowRequestNotificationService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class FollowRequestNotificationController {

    @Autowired
    FollowRequestNotificationService followRequestNotificationService;

    @PostMapping("api/followRequestNotification/send")
    public String sendFollowRequestNotification(@RequestBody FollowRequestNotification notification,
                                                HttpServletRequest request,
                                                HttpServletResponse response){

        boolean result = followRequestNotificationService.sendFollowRequestNotification(notification);

        if (!result){

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "failure";
        }
        else{

            return "success";
        }
    }

    @GetMapping ("api/followRequestNotification/get")
    public List<FollowRequestNotification> getFollowRequestNotificationByReceiverId(@RequestParam long id,
                                                                                    HttpServletRequest request,
                                                                                    HttpServletResponse response){

        List<FollowRequestNotification> result = followRequestNotificationService.getFollowRequestsByReceiverId(id);

        if (result == null || result.size() == 0){

            response.setStatus(201);
        }

        return result;
    }
}
