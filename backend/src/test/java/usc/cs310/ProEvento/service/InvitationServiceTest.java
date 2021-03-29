package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.Invitation;
import usc.cs310.ProEvento.model.User;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InvitationServiceTest {
    @Autowired
    private InvitationService invitationService;
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;

    @Test
    public void createInvitationTest() {
        User user_1 = userService.getUserBydId(1);
        Assertions.assertNotNull(user_1);
        User user_2 = userService.getUserBydId(2);
        Assertions.assertNotNull(user_2);
        Event event = eventService.getEventById(1);
        Assertions.assertNotNull(event);
        Invitation invitation = new Invitation();
        invitation.setContent("Test Invitation");
        invitation.setDateTime(LocalDateTime.of(2020, 12, 1, 12, 30));
        invitation.setSender(user_1);
        invitation.setEvent(event);
        Set<User> receivers = new HashSet<User>();
        receivers.add(user_2);
        Assertions.assertNotNull(receivers);
        invitation.setReceivers(receivers);
        Assertions.assertNotNull(invitation);

        Assertions.assertEquals(true, invitationService.sendInvitations(invitation));
    }

    @Test
    public void getInvitationTest() {
        User user_1 = userService.getUserBydId(1);
        List<Invitation> invitationsList = invitationService.getInvitationsByReceiverId(user_1.getId());
        int size_before = invitationsList.size();
        User user_2 = userService.getUserBydId(2);
        Event event = eventService.getEventById(2);
        Assertions.assertNotNull(event);
        Invitation invitation = new Invitation();
        invitation.setContent("Test Adding an Invitation");
        invitation.setDateTime(LocalDateTime.of(2020, 12, 1, 12, 30));
        invitation.setSender(user_2);
        invitation.setEvent(event);
        Set<User> receivers = new HashSet<User>();
        receivers.add(user_1);
        Assertions.assertNotNull(receivers);
        invitation.setReceivers(receivers);
        Assertions.assertNotNull(invitation);
        invitationService.sendInvitations(invitation);
        invitationsList = invitationService.getInvitationsByReceiverId(user_1.getId());
        int size_after = invitationsList.size();

        Assertions.assertEquals(1, size_after - size_before);
    }
}
