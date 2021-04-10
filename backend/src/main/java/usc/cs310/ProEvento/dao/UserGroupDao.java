package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.UserGroup;

import java.util.Collections;
import java.util.List;

@Repository
public class UserGroupDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createGroup(UserGroup userGroup) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(userGroup);
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

    public UserGroup selectGroupById(long groupId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            UserGroup userGroup = (UserGroup) session.get(UserGroup.class, groupId);
            session.getTransaction().commit();
            return userGroup;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<UserGroup> selectGroupsByName(String name) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM UserGroup g WHERE g.name LIKE :name");
            query.setParameter("name", '%' + name + '%');
            List<UserGroup> userGroups = (List<UserGroup>) query.list();
            session.getTransaction().commit();
            return userGroups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<UserGroup> selectGroupsByMemberId(long memberId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT g FROM UserGroup g JOIN g.members m WHERE m.id = :memberId");
            query.setParameter("memberId", memberId);
            List<UserGroup> userGroups = (List<UserGroup>) query.list();
            session.getTransaction().commit();
            return userGroups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<UserGroup> selectGroupsByFounderId(long founderId) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT g FROM UserGroup g JOIN g.founder f WHERE f.id = :founderId");
            query.setParameter("founderId", founderId);
            List<UserGroup> userGroups = (List<UserGroup>) query.list();
            session.getTransaction().commit();
            return userGroups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // TODO: Implement this function.
    public List<UserGroup> selectGroupsByTag(long tagId) {
        return Collections.emptyList();
    }

    public List<UserGroup> selectAllGroups() {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM UserGroup");
            List<UserGroup> userGroups = (List<UserGroup>) query.list();
            session.getTransaction().commit();
            return userGroups;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateGroup(UserGroup userGroup) {
        return this.createGroup(userGroup);
    }

    public boolean deleteGroup(UserGroup userGroup) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(userGroup);
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
