package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.requestbody.ChangePasswordRequestBody;
import usc.cs310.ProEvento.service.AccountService;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/api/account/register")
    public Account registerAccount(@RequestBody Account account) {
        account = accountService.registerAccount(account);
        return account;
    }

    @PostMapping("/api/account/login")
    public Account loginAccount(@RequestBody Account account) {
        account = accountService.loginAccount(account);
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
}
