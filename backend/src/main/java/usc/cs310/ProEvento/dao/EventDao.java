package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.Tag;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Repository
public class EventDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createEvent(Event event) {
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

    public Event selectEventById(long eventId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Event event = (Event) session.get(Event.class, eventId);
            session.getTransaction().commit();
            return event;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Event> selectEventsByName(String name) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM Event e WHERE e.name LIKE :name");
            query.setParameter("name", '%' + name + '%');
            List<Event> events = (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Event> selectEventsByGuestId(long guestId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT e FROM Event e JOIN e.guests g WHERE g.id = :guestId");
            query.setParameter("guestId", guestId);
            List<Event> events = (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Event> selectEventsByHostId(long hostId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT e FROM Event e JOIN e.host h WHERE h.id = :hostId");
            query.setParameter("hostId", hostId);
            List<Event> events = (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Event> selectEventsByDate(Date date) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM Event e WHERE DATE(e.dateTime) = :date");
            query.setParameter("date", date);
            List<Event> events = (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Event> selectEventsByHashtag(String hashtag) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM Event e WHERE e.hashtags LIKE :hashtag");
            query.setParameter("hashtag", '%' + hashtag + '%');
            List<Event> events = (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // TODO: Implement this function.
    public List<Event> selectEventsByTag(Tag tag) {
        return Collections.emptyList();
    }

    public List<Event> selectAllEvents() {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM Event");
            List<Event> events= (List<Event>) query.list();
            session.getTransaction().commit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateEvent(Event event) {
        return this.createEvent(event);
    }

    public boolean deleteEvent(Event event) {
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
