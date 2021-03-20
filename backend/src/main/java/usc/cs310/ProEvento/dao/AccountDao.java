package usc.cs310.ProEvento.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usc.cs310.ProEvento.model.Account;

@Repository
public class AccountDao {
    @Autowired
    private SessionFactory sessionFactory;

    public boolean createAccount(Account account) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.saveOrUpdate(account);
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

    public Account selectAccountById(long accountId) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Account account = (Account) session.get(Account.class, accountId);
            session.getTransaction().commit();
            return account;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Account selectAccountByEmail(String accountEmail) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM Account a WHERE a.email = :email");
            query.setParameter("email", accountEmail);
            Account account = (Account) query.uniqueResult();
            session.getTransaction().commit();
            return account;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Account selectAccountByPhoneNumber(String phoneNumber) {
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            Query query = session.createQuery("FROM Account a WHERE a.phoneNumber = :phoneNumber");
            query.setParameter("phoneNumber", phoneNumber);
            Account account = (Account) query.uniqueResult();
            session.getTransaction().commit();
            return account;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean updateAccount(Account account) {
        return createAccount(account);
    }

    public boolean deleteAccount(Account account) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.delete(account);
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
