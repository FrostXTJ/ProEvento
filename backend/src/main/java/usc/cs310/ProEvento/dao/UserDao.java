package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.Tag;
import usc.cs310.ProEvento.model.User;

import java.util.Collections;
import java.util.List;

@Repository
public class UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    public User selectUserById(long userId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            User user = (User) session.get(User.class, userId);
            session.getTransaction().commit();
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<User> selectUsersByName(String username) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("FROM User u WHERE u.username LIKE :username");
            query.setParameter("username", '%' + username + '%');
            List<User> users = (List<User>) query.list();;
            session.getTransaction().commit();
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<User> selectUserByTag(Tag tag) {
        try (Session session = sessionFactory.openSession()) {
            session.getTransaction().begin();
            Query query = session.createQuery("SELECT u FROM User u JOIN u.tags t WHERE t.id = :tagId");
            query.setParameter("tagId", tag.getId());
            List<User> users = (List<User>) query.list();
            session.getTransaction().commit();
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean updateUser(User user) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.update(user);
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

    public boolean deleteUser(User user) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.delete(user);
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
