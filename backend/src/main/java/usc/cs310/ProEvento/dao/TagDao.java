package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Tag;

import java.util.Collections;
import java.util.List;

@Repository
public class TagDao {

    @Autowired
    private SessionFactory sessionFactory;

    public boolean createTag(Tag tag) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(tag);
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

    public Tag selectTagById(long tagId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Tag tag = (Tag) session.get(Tag.class, tagId);
            session.getTransaction().commit();
            return tag;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Tag> selectAllTags() {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM Tag");
            List<Tag> tags= (List<Tag>) query.list();
            session.getTransaction().commit();
            return tags;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateTag(Tag tag) {
        return createTag(tag);
    }
}
