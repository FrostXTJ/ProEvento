package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.requestbody.ChangePasswordRequestBody;
import usc.cs310.ProEvento.model.requestbody.LoginRequestBody;
import usc.cs310.ProEvento.model.requestbody.RegisterRequestBody;
import usc.cs310.ProEvento.service.AccountService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/api/account/register")
    public Account registerAccount(@RequestBody RegisterRequestBody requestBody,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        Account account = new Account();
        account.setEmail(requestBody.email);
        account.setPhoneNumber(requestBody.phoneNumber);
        account.setPassword(requestBody.password);
        account.setUser(requestBody.user);

        account = accountService.registerAccount(account);
        if (account == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return account;
    }

    @PostMapping("/api/account/login")
    public Account loginAccount(@RequestBody LoginRequestBody requestBody,
                                HttpServletRequest request,
                                HttpServletResponse response) {
        Account account = new Account();
        account.setEmail(requestBody.email);
        account.setPhoneNumber(requestBody.phoneNumber);
        account.setPassword(requestBody.password);

        account = accountService.loginAccount(account);
        if (account == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return account;
    }

    @PostMapping("/api/account/change_password")
    public boolean changePassword(@RequestBody ChangePasswordRequestBody requestBody,
                                  HttpServletRequest request,
                                  HttpServletResponse response) {
        boolean success = accountService.changePassword(requestBody.accountId, requestBody.newPassword);
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }

}
