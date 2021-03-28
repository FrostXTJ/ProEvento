package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.Invitation;
import usc.cs310.ProEvento.service.InvitationService;

import java.util.List;

@RestController
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @GetMapping("/api/invitation")
    public Invitation getInvitationById(@RequestParam long invitationId) {
        Invitation invitation = invitationService.getInvitationById(invitationId);
        return invitation;
    }

    @GetMapping("/api/invitation/invitations_by_receiver")
    public List<Invitation> getInvitationsByReceiverId(@RequestParam long userId) {
        List<Invitation> invitations = invitationService.getInvitationsByReceiverId(userId);
        return invitations;
    }

    @PostMapping("/api/invitation/send")
    public String sendInvitation(@RequestBody Invitation invitation) {
        boolean success = invitationService.sendInvitations(invitation);
        if (success) {
            return "success";
        }
        return "failure";
    }
}
