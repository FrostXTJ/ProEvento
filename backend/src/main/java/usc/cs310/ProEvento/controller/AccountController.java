package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.requestbody.ChangePasswordRequestBody;
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
                                HttpServletResponse response
                                ) {
        account = accountService.loginAccount(account);
        if (account == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return account;
    }

    @PostMapping("/api/account/change_password")
    public String changePassword(@RequestBody ChangePasswordRequestBody requestBody) {
        boolean success = accountService.changePassword(
                requestBody.accountId,
                requestBody.currentPassword,
                requestBody.newPassword
        );
        if (success) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/account/deactivate")
    public String deactivate(@RequestBody Account account) {
        boolean success = accountService.deactivateAccount(account);
        if (success) {
            return "success";
        }
        return "failure";
    }
}
