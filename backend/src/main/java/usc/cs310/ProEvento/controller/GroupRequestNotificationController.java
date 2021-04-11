package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.GroupRequestNotification;
import usc.cs310.ProEvento.service.GroupRequestNotificationService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class GroupRequestNotificationController {

    @Autowired
    GroupRequestNotificationService groupRequestNotificationService;

    @PostMapping("api/groupRequestNotification/send")
    public String sendGroupRequestNotification(@RequestBody GroupRequestNotification notification,
                                               HttpServletRequest request,
                                               HttpServletResponse response){

        boolean result = groupRequestNotificationService.sendGroupRequestNotification(notification);

        if (!result){

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "failure";
        }
        else{

            return "success";
        }
    }

    @GetMapping ("api/groupRequestNotification/get")
    public List<GroupRequestNotification> getGroupNotificationByReceiverId(@RequestParam long id,
                                                                           HttpServletRequest request,
                                                                           HttpServletResponse response){

        List<GroupRequestNotification> result = groupRequestNotificationService.getGroupRequestNotificationByReceiverId(id);

        if (result == null || result.size() == 0){

            response.setStatus(201);
        }

        return result;
    }
}
