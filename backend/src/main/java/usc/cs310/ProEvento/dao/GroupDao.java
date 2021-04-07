package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Group;

import java.util.Collections;
import java.util.List;

@Repository
public class GroupDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createGroup(Group group) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(group);
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

    public Group selectGroupById(long groupId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Group group = (Group) session.get(Group.class, groupId);
            session.getTransaction().commit();
            return group;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Group> selectGroupsByName(String name) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM Group g WHERE g.name LIKE :name");
            query.setParameter("name", '%' + name + '%');
            List<Group> groups = (List<Group>) query.list();
            session.getTransaction().commit();
            return groups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Group> selectGroupsByMemberId(long memberId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT g FROM Group g JOIN g.members m WHERE m.id = :memberId");
            query.setParameter("memberId", memberId);
            List<Group> groups = (List<Group>) query.list();
            session.getTransaction().commit();
            return groups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Group> selectGroupsByFounderId(long founderId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT g FROM Group g JOIN g.founder f WHERE f.id = :founderId");
            query.setParameter("founderId", founderId);
            List<Group> groups = (List<Group>) query.list();
            session.getTransaction().commit();
            return groups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // TODO: Implement this function.
    public List<Group> selectGroupsByTag(long tagId) {
        return Collections.emptyList();
    }

    public List<Group> selectAllGroups() {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM Group");
            List<Group> groups = (List<Group>) query.list();
            session.getTransaction().commit();
            return groups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateGroup(Group group) {
        return this.createGroup(group);
    }

    public boolean deleteGroup(Group group) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(group);
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
