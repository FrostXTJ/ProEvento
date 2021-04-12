package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.FollowRequestNotification;
import usc.cs310.ProEvento.model.GroupRequestNotification;

import javax.swing.*;
import java.util.List;

@Repository
public class GroupRequestNotificationDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public boolean createGroupRequestNotification(GroupRequestNotification notification){

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

    public boolean updateGroupNotification(GroupRequestNotification notification){

        return createGroupRequestNotification(notification);
    }

    public GroupRequestNotification getGroupRequestNotificationById(long id){

        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            GroupRequestNotification notification = (GroupRequestNotification) session.get(GroupRequestNotification.class, id);
            session.getTransaction().commit();
            return notification;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<GroupRequestNotification> getGroupRequestNotificationByReceiverId(long id){

        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("SELECT i FROM GroupRequestNotification i JOIN i.receivers r WHERE r.id = :receiverId");
            query.setParameter("receiverId", id);
            List<GroupRequestNotification> notifications = (List<GroupRequestNotification>) query.list();
            session.getTransaction().commit();
            return notifications;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deleteGroupRequestNotification(GroupRequestNotification notification){

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
