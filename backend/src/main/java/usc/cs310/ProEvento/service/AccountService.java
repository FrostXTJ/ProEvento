package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.AccountDao;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.User;

@Service
public class AccountService {
    @Autowired
    private AccountDao accountDao;

    public Account getAccountById(int id) {
        return accountDao.selectAccountById(id);
    }

    public Account registerAccount(Account account) {

        String email = account.getEmail();
        String phoneNumber = account.getPhoneNumber();
        String password = account.getPassword();
        User user = account.getUser();

        // Password cannot be empty.
        if (password == null || password.equals("")) {
            return null;
        }
        // Email and phone number cannot be both empty.
        if ((email == null || email.equals(""))
                && (phoneNumber == null || phoneNumber.equals(""))) {
            return null;
        }

        // Email and phone number cannot be duplicate with existing entries.
        if (email != null && !email.equals("")
                && accountDao.selectAccountByEmail(email) != null) {
            return null;
        }
        if (phoneNumber != null && !phoneNumber.equals("")
                && accountDao.selectAccountByPhoneNumber(phoneNumber) != null) {
            return null;
        }

        // User information field cannot be empty.
        if (user == null || user.getUsername() == null || user.getUsername().equals("")) {
            return null;
        }

        account.getUser().setStatus("Free");
        if (accountDao.createAccount(account)) {
            if (email != null && !email.equals("")) {
                account = accountDao.selectAccountByEmail(email);
            } else {
                account = accountDao.selectAccountByPhoneNumber(phoneNumber);
            }
            return account;
        }
        return null;
    }

    public Account loginAccount(Account account) {
        if (account.getPassword() == null || account.getPassword().equals("")) {
            return null;
        }

        if (account.getEmail() != null && !account.getEmail().equals("")) {
            return loginWithEmail(account.getEmail(), account.getPassword());
        }
        if (account.getPhoneNumber() != null && !account.getPhoneNumber().equals("")) {
            return loginWithPhoneNumber(account.getPhoneNumber(), account.getPassword());
        }
        return null;
    }


    public Account loginWithEmail(String email, String password) {
        Account account = accountDao.selectAccountByEmail(email);
        if (!password.equals(account.getPassword())) {
            return null;
        }
        return account;
    }

    public Account loginWithPhoneNumber(String phoneNumber, String password) {
        Account account = accountDao.selectAccountByPhoneNumber(phoneNumber);
        if (!account.getPassword().equals(password)) {
            return null;
        }
        return account;
    }

    public boolean changePassword(Account account) {
        if (accountDao.selectAccountById(account.getId()) == null) {
            return false;
        }
        return accountDao.updateAccount(account);
    }
}
