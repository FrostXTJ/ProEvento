package usc.cs310.ProEvento.service;
import org.junit.jupiter.api.Assertions;
import usc.cs310.ProEvento.model.Tag;
import usc.cs310.ProEvento.model.User;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Autowired
    private TagService tagService;

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


    @Test
    public void followUnfollowTest(){

        //User1 followed user2, user2 should be displayed in User1's list
        long user1Id = 1;
        long user2Id = 4;
        Boolean follow = userService.followUser(user1Id,user2Id);

        List<User> user1FollowingList = userService.getFollowingById(user1Id);
        List<Long> followeeId = new ArrayList<Long>();

        for  (User user : user1FollowingList) {
            followeeId.add(user.getId());
        }

        //the user1 should have the following list [6, 4]
        Assertions.assertEquals(6 , followeeId.get(0));
        Assertions.assertEquals(4 , followeeId.get(1));

        //User1 unfollowed user2, user2 should not be displayed in User1's list
        Boolean unfollow = userService.unfollowUser(user1Id,user2Id);
        user1FollowingList = userService.getFollowingById(user1Id);
        followeeId.clear();

        for  (User user : user1FollowingList) {
            followeeId.add(user.getId());
        }

        //the user1 should have the following list [6]
        Assertions.assertEquals(6 , followeeId.get(0));
    }

    @Test
    public void userProfileTest(){

        //When accessing user1's profile, their basic info, optionally events hosting or attending should be displayed
        long user1Id = 6;
        User user = userService.getUserBydId(user1Id);

        String userName = user.getUsername();
        String biography = user.getBiography();

        Assertions.assertEquals("Shannon",userName);
        Assertions.assertEquals("A Mathematical Theorist of Cryptography.",biography);
    }

    @Test
    public void userTagTest(){

        //The user should be able to add a tag which is interesting
        long user1Id = 2;
        long tagId = 3;
        Boolean add = userService.addTag(user1Id,tagId);

        User user = userService.getUserBydId(user1Id);
        Set<Tag> tagList = user.getTags();
        //The user should have two tags now, which is "Video game" and "Dance"
        List<String> name = new ArrayList<String>();

        for (Tag item : tagList){
            name.add(item.getName());
        }
        Assertions.assertEquals("Video Game",name.get(0));
        Assertions.assertEquals("Dance",name.get(1));

        //The user should be able to remove a tag which is not interesting
        Boolean remove = userService.removeTag(user1Id,tagId);
        user = userService.getUserBydId(user1Id);
        tagList.clear();
        tagList = user.getTags();

        //The user should have one tag now, which is "Video game"
        name.clear();
        for (Tag item : tagList){
            name.add(item.getName());
        }
        Assertions.assertEquals("Video Game",name.get(0));
    }


}
