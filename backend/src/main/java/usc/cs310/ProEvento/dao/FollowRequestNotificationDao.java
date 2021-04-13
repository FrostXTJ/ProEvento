package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.EventNotification;
import usc.cs310.ProEvento.model.FollowRequestNotification;
import usc.cs310.ProEvento.model.Invitation;
import usc.cs310.ProEvento.model.User;

import java.util.List;

@Repository
public class FollowRequestNotificationDao {

    @Autowired
    private SessionFactory sessionFactory;

    public boolean createFollowRequestNotification(FollowRequestNotification notification){
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(notification);
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

    public FollowRequestNotification getFollowRequestNotificationById(long id){
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            FollowRequestNotification notification = (FollowRequestNotification) session.get(FollowRequestNotification.class, id);
            session.getTransaction().commit();
            return notification;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<FollowRequestNotification> getFollowRequestByReceiverId(long id){
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("SELECT i FROM FollowRequestNotification i JOIN i.receivers r WHERE r.id = :receiverId");
            query.setParameter("receiverId", id);
            List<FollowRequestNotification> notifications = (List<FollowRequestNotification>) query.list();
            session.getTransaction().commit();
            return notifications;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean updateFollowRequest(FollowRequestNotification notification){
        return createFollowRequestNotification(notification);
    }

    public boolean deleteFollowRequest(FollowRequestNotification notification){
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(notification);
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
