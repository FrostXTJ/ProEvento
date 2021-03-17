package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.service.AccountService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/api/account/register")
    public Account registerAccount(@RequestBody Account account,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        account = accountService.registerAccount(account);
        if (account == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return account;
    }

    @PostMapping("/api/account/login")
    public Account loginAccount(@RequestBody Account account,
                                HttpServletRequest request,
                                HttpServletResponse response) {
        account = accountService.loginAccount(account);
        if (account == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return account;
    }

    @PostMapping("/api/account/change_password")
    public boolean changePassword(@RequestBody Account account,
                                  HttpServletRequest request,
                                  HttpServletResponse response) {
        boolean success = accountService.changePassword(account);
        if (!success) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return success;
    }

}
