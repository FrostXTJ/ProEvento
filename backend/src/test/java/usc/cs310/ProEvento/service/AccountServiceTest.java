package usc.cs310.ProEvento.service;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.Account;
import usc.cs310.ProEvento.model.User;

import java.util.Random;

@SpringBootTest
public class AccountServiceTest {
    @Autowired
    private AccountService accountService;

    @Test
    public void loginTestOne(){
        System.out.println("Testing login with correct email and password");

        Account account = new Account();
        account.setEmail("yuxizhou@usc.edu");
        account.setPassword("123456");

        Account login = accountService.loginAccount(account);
        Assertions.assertNotNull(login);

        Assertions.assertTrue(login.getEmail().equals("yuxizhou@usc.edu"));
        Assertions.assertTrue(login.getPassword().equals("******"));
    }

    @Test
    public void loginTestTwo(){
        System.out.println("Testing login with wrong email or password");
        Account account = new Account();
        account.setEmail("yuxizhou@usc.edu");
        account.setPassword("cs310");

        Account login = accountService.loginAccount(account);
        Assertions.assertNull(login);

    }

    @Test
    public void registerTestOne(){
        System.out.println("Testing register with an unused email, password and user info");
        Account account = new Account();


        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        //random email address generator
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        account.setEmail(generatedString + "@usc.edu");
        account.setPassword("cs310");
        User u = new User();
        u.setUsername("andy");
        account.setUser(u);

        Account register = accountService.registerAccount(account);
        Assertions.assertNotNull(register);
        Assertions.assertEquals(register.getEmail(), account.getEmail());
        Assertions.assertEquals(register.getUser(), account.getUser());
    }

    @Test
    public void registerTestTwo(){
        System.out.println("Testing register with a taken email");
        Account account = new Account();
        account.setEmail("yuxizhou@usc.edu");
        account.setPassword("cs310");
        User u = new User();
        u.setUsername("andy");
        account.setUser(u);

        Account register = accountService.registerAccount(account);
        Assertions.assertNull(register);
    }
}