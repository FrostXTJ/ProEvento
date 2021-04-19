package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.EventNotification;
import usc.cs310.ProEvento.model.requestbody.ChangePasswordRequestBody;
import usc.cs310.ProEvento.model.requestbody.UserNotificationRequestBody;
import usc.cs310.ProEvento.service.EventNotificationService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class EventNotificationController {
    @Autowired
    EventNotificationService eventNotificationService;

    @PostMapping("/api/event_notification/send")
    public String sendEventNotification(@RequestBody EventNotification notification,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        boolean result = eventNotificationService.sendEventNotification(notification);
        if (!result) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "failure";
        }
        return "success";
    }

    @GetMapping("/api/event_notification/by_receiver_id")
    public List<EventNotification> getEventNotificationByReceiverId(@RequestParam long userId,
                                                                    HttpServletRequest request,
                                                                    HttpServletResponse response) {
        List<EventNotification> result = eventNotificationService.getEventNotificationByReceiverId(userId);
        if (result == null || result.size() == 0) {
            response.setStatus(201);
        }
        return result;
    }

    @PostMapping("/api/event_notification/remove_receiver")
    public String removeEventNotificationReceiver(@RequestBody UserNotificationRequestBody requestBody) {
        boolean success = eventNotificationService.removeEventNotificationReceiver(
                requestBody.userId,
                requestBody.notificationId
        );
        if (success) {
            return "success";
        }
        return "failure";
    }
}
