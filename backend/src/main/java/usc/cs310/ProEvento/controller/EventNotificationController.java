package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.EventNotification;
import usc.cs310.ProEvento.service.EventNotificationService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class EventNotificationController {

    @Autowired
    EventNotificationService eventNotificationService;

    @PostMapping("api/eventNotification/send")
    public String sendEventNotification(@RequestBody EventNotification notification,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response){

        boolean result = eventNotificationService.sendEventNotification(notification);

        if (!result){

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "failure";
        }

        return "success";
    }

    @GetMapping ("api/eventNotification/getByReceiverId")
    public List<EventNotification> getEventNotificationByReceiverId(@RequestParam long id,
                                                                    HttpServletRequest request,
                                                                    HttpServletResponse response){

        List<EventNotification> result = eventNotificationService.getEventNotificationByReceiverId(id);
        if (result == null || result.size() == 0){

            response.setStatus(201);
        }

        return result;
    }
}
