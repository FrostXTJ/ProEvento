package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.EventDao;
import usc.cs310.ProEvento.dao.InvitationDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.Invitation;

import java.util.List;

@Service
public class InvitationService {
    @Autowired
    private InvitationDao invitationDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EventDao eventDao;

    public boolean sendInvitations(Invitation invitation) {
        if (invitation == null || invitation.getSender() == null
        || invitation.getReceivers() == null
        || invitation.getReceivers().size() == 0
        || invitation.getEvent() == null
        || userDao.selectUserById(invitation.getSender().getId()) == null
        || eventDao.selectEventById(invitation.getEvent().getId()) == null ) {
            return false;
        }
        return invitationDao.createInvitation(invitation);
    }

    public Invitation getInvitationById(long invitationId) {
        return invitationDao.selectInvitationsById(invitationId);
    }

    public List<Invitation> getInvitationsByReceiverId(long receiverId) {
        return invitationDao.selectInvitationsByReceiverId(receiverId);
    }



}
