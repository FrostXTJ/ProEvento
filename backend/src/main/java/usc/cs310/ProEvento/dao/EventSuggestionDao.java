package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.EventSuggestion;

import java.util.List;

@Repository
public class EventSuggestionDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createEventSuggestion(EventSuggestion suggestion) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(suggestion);
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

    public EventSuggestion selectEventSuggestionById(long suggestionId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            EventSuggestion suggestion = (EventSuggestion) session.get(EventSuggestion.class, suggestionId);
            session.getTransaction().commit();
            return suggestion;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<EventSuggestion> selectEventSuggestionsByGroupId(long groupId){
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("SELECT e FROM EventSuggestion e JOIN e.userGroup g WHERE g.id = :groupId");
            query.setParameter("groupId", groupId);
            List<EventSuggestion> suggestions = (List<EventSuggestion>) query.list();
            session.getTransaction().commit();
            return suggestions;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean updateEventSuggestion(EventSuggestion suggestion) {
        return createEventSuggestion(suggestion);
    }
}
