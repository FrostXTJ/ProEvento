package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Invitation;

import java.util.List;

@Repository
public class InvitationDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createInvitation(Invitation invitation) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(invitation);
            session.getTransaction().commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
            return false;
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public Invitation selectInvitationsById(long invitationId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Invitation invitations = (Invitation) session.get(Invitation.class, invitationId);
            session.getTransaction().commit();
            return invitations;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Invitation> selectInvitationsByReceiverId(long receiverId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("SELECT i FROM Invitation i JOIN i.receivers r WHERE r.id = :receiverId");
            query.setParameter("receiverId", receiverId);
            List<Invitation> invitations = (List<Invitation>) query.list();
            session.getTransaction().commit();
            return invitations;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean updateInvitation(Invitation invitation) {
        return createInvitation(invitation);
    }

    public boolean deleteInvitation(Invitation invitation) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(invitation);
            session.getTransaction().commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
            return false;
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
