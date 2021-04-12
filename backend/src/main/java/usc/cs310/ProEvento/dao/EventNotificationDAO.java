package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.EventNotification;

import java.util.Collections;
import java.util.List;

@Repository
public class EventNotificationDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public boolean createEventNotification(EventNotification event){

        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(event);
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

    public EventNotification selectEventNotificationById(long notificationId){

        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            EventNotification notification = (EventNotification) session.get(EventNotification.class, notificationId);
            session.getTransaction().commit();
            return notification;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<EventNotification> selectEventNotificationByType(String type) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM EventNotification e WHERE e.type LIKE :type");
            query.setParameter("type", '%' + type + '%');
            List<EventNotification> notifications = (List<EventNotification>) query.list();
            session.getTransaction().commit();
            return notifications;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<EventNotification> selectEventNotificationByReceiverId(long receiverId){

        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT e FROM EventNotification e JOIN e.receivers r WHERE r.id = :receiverId");
            query.setParameter("receiverId", '%' + receiverId + '%');
            List<EventNotification> notifications = (List<EventNotification>) query.list();
            session.getTransaction().commit();
            return notifications;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }

    }

    public List<EventNotification> selectAllEventNotification(){
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM EventNotification");
            List<EventNotification> notifications = (List<EventNotification>) query.list();
            session.getTransaction().commit();
            return notifications;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateEventNotification(EventNotification event){

        return createEventNotification((event));
    }

    public boolean deleteEventNotification(EventNotification event) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(event);
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
