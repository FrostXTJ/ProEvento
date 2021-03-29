package usc.cs310.ProEvento.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usc.cs310.ProEvento.model.User;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testUserWhoExists() {
        Assertions.assertEquals(true, userService.getUsersByName("Tommy Trojan").size() != 0);
        Assertions.assertEquals(true, userService.getUsersByName("Turing").size() != 0);
    }

    @Test
    public void testUserWhoDoesNotExist() {
        Assertions.assertEquals(false, userService.getUsersByName("Null").size() != 0);
        Assertions.assertEquals(false, userService.getUsersByName("Empty").size() != 0);
    }

    @Test
    public void testMultipleSpacesInName() {
        Assertions.assertEquals(false, userService.getUsersByName("Tommy            Trojan").size() != 0);
        Assertions.assertEquals(false, userService.getUsersByName("         Turing").size() != 0);
    }
}
