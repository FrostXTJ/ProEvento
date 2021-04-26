package usc.cs310.ProEvento;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import usc.cs310.ProEvento.model.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class ProEventoDatabaseInitializer {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ProEventoConfig.class);
        SessionFactory sessionFactory = (SessionFactory) context.getBean("sessionFactory");

        Session session = sessionFactory.openSession();
        try {
            Tag tagGame = new Tag();
            tagGame.setName("Video Game");
            Tag tagMusic = new Tag();
            tagMusic.setName("Music");
            Tag tagDance = new Tag();
            tagDance.setName("Dance");
            Tag tagTech = new Tag();
            tagTech.setName("Tech");
            Tag tagFashion = new Tag();
            tagFashion.setName("Fashion");
            Tag tagFun = new Tag();
            tagFun.setName("Fun");
            Tag tagAnime = new Tag();
            tagAnime.setName("Anime");
            Tag tagFood = new Tag();
            tagFood.setName("Food");
            Tag tagReading = new Tag();
            tagReading.setName("Reading");
            Tag tagLife = new Tag();
            tagLife.setName("Life");
            Tag tagSports = new Tag();
            tagSports.setName("Sports");
            Tag tagRacing = new Tag();
            tagRacing.setName("Racing");
            Tag tagHiking = new Tag();
            tagHiking.setName("Hiking");
            Tag tagBoardGame = new Tag();
            tagBoardGame.setName("Board Game");
            Tag tagLOL = new Tag();
            tagLOL.setName("League of Legends");
            Tag tagFortnite = new Tag();
            tagFortnite.setName("Fortnite");
            Tag tagFamily = new Tag();
            tagFamily.setName("Family");
            Tag tagEntertainment = new Tag();
            tagEntertainment.setName("Entertainment");
            Tag tagCar = new Tag();
            tagCar.setName("Car");
            Tag tagPolitics = new Tag();
            tagPolitics.setName("Politics");
            Tag tagNews = new Tag();
            tagNews.setName("News");

            Account testAccountTommy = new Account();
            testAccountTommy.setEmail("tommy@usc.edu");
            testAccountTommy.setPhoneNumber("111-111-1111");
            testAccountTommy.setPassword("uscfighton!");

            Account testAccountTuring = new Account();
            testAccountTuring.setEmail("alanturing@mail.com");
            testAccountTuring.setPhoneNumber("123-456-7890");
            testAccountTuring.setPassword("helloworld123");

            Account testAccountNeumann = new Account();
            testAccountNeumann.setEmail("johnneumann@mail.com");
            testAccountNeumann.setPhoneNumber("000-000-0000");
            testAccountNeumann.setPassword("111111");

            User testUserTommy = new User();
            testUserTommy.setUsername("Tommy Trojan");
            testUserTommy.setBiography("USC fight on!");
            testUserTommy.setAvatarUrl("");
            testUserTommy.setStatus("Free");
            testUserTommy.setTags(Set.of(tagGame, tagMusic, tagDance, tagLife));
            testUserTommy.setEnableNotifications(true);
            testAccountTommy.setUser(testUserTommy);

            User testUserTuring = new User();
            testUserTuring.setUsername("Turing");
            testUserTuring.setBiography("Hello world!");
            testUserTuring.setAvatarUrl("");
            testUserTuring.setStatus("Free");
            testUserTuring.setTags(Set.of(tagTech, tagMusic));
            testUserTuring.setEnableNotifications(true);
            testAccountTuring.setUser(testUserTuring);

            User testUserNeumann = new User();
            testUserNeumann.setUsername("Neumann");
            testUserNeumann.setBiography("Hi, I am new to ProEvento!");
            testUserNeumann.setAvatarUrl("");
            testUserNeumann.setStatus("Free");
            testUserNeumann.setTags(Set.of(tagTech, tagFun, tagFood));
            testUserNeumann.setEnableNotifications(true);
            testAccountNeumann.setUser(testUserNeumann);

            testUserTuring.follow(testUserTommy);
            testUserNeumann.follow(testUserTommy);
            testUserNeumann.follow(testUserTuring);

            Event testEventOne = new Event();
            testEventOne.setName("Best Songs for CSCI 310");
            testEventOne.setCoverImageUrl("");
            testEventOne.setDescription("What is the best song in CSCI 310?");
            testEventOne.setStatus("open for registration");
            testEventOne.setHashtags("#cs310 #usc");
            testEventOne.setTag(tagMusic);
            testEventOne.setDateTime(LocalDateTime.of(2021, 5, 1, 12, 0, 0));
            testEventOne.setHost(testUserTommy);
            testUserTuring.registerEvent(testEventOne);
            testEventOne.cancel();

            Event testEventTwo = new Event();
            testEventTwo.setName("The First Video Game!");
            testEventTwo.setCoverImageUrl("");
            testEventTwo.setDescription("The first computer game in the human history!");
            testEventTwo.setStatus("open for registration");
            testEventTwo.setHashtags("#game");
            testEventTwo.setTag(tagGame);
            testEventTwo.setHost(testUserTuring);
            testEventTwo.setDateTime(LocalDateTime.of(2021, 12, 21, 10, 0, 0));

            Invitation testInvitation = new Invitation();
            testInvitation.setSender(testUserTommy);
            testInvitation.setContent("I am going to host a brand new event! Let's check it out!");
            testInvitation.setEvent(testEventOne);
            testInvitation.setDateTime(LocalDateTime.of(2021, 03, 15, 13, 10, 10));
            testInvitation.setReceivers(testUserTommy.getFollowers());

            UserGroup testUserGroupUSC = new UserGroup();
            testUserGroupUSC.setName("USC Group");
            testUserGroupUSC.setFounder(testUserTommy);
            testUserGroupUSC.setDescription("ProEvento group for University of Southern California");
            testUserGroupUSC.setAvatarUrl("");
            testUserGroupUSC.setTag(tagLife);
            testUserGroupUSC.setMembers(new HashSet<>(Set.of(testUserTommy, testUserNeumann, testUserTuring)));

            UserGroup testUserGroupCS = new UserGroup();
            testUserGroupCS.setName("Computer Scientists Group");
            testUserGroupCS.setFounder(testUserTuring);
            testUserGroupCS.setDescription("User group for computer scientists");
            testUserGroupCS.setAvatarUrl("");
            testUserGroupCS.setTag(tagTech);
            testUserGroupCS.setMembers(new HashSet<>(Set.of(testUserTuring, testUserNeumann))   );

            EventNotification testEventNotification = new EventNotification();
            testEventNotification.setContent("Event \'Best Songs for CSCI 310\' hosted by Tommy has been cancelled.");
            testEventNotification.setSender(testUserTommy);
            testEventNotification.setEvent(testEventOne);
            testEventNotification.setDateTime(LocalDateTime.now());
            testEventNotification.setType("cancel");
            Set<User> s = new HashSet<>();
            s.add(testUserTuring);
            testEventNotification.setReceivers(s);

            FollowRequestNotification testFollowRequestNotification = new FollowRequestNotification();
            testFollowRequestNotification.setSender(testUserNeumann);
            testFollowRequestNotification.setReceivers(Set.of(testUserTuring));
            testFollowRequestNotification.setDateTime(LocalDateTime.now());
            testFollowRequestNotification.setContent("Neumann wants to follow you");

            GroupRequestNotification testGroupRequestNotification= new GroupRequestNotification();
            testGroupRequestNotification.setUserGroup(testUserGroupCS);
            testGroupRequestNotification.setDateTime(LocalDateTime.now());
            testGroupRequestNotification.setSender(testUserTommy);
            testGroupRequestNotification.setReceivers(Set.of(testUserGroupCS.getFounder()));
            testGroupRequestNotification.setContent("Tommy wants to join Computer Scientists Group.");

            session.beginTransaction();
            session.save(tagGame);
            session.save(tagMusic);
            session.save(tagDance);
            session.save(tagTech);
            session.save(tagFashion);
            session.save(tagFun);
            session.save(tagAnime);
            session.save(tagReading);
            session.save(tagFood);
            session.save(tagLife);
            session.save(tagSports);
            session.save(tagCar);
            session.save(tagRacing);
            session.save(tagHiking);
            session.save(tagBoardGame);
            session.save(tagLOL);
            session.save(tagFortnite);
            session.save(tagFamily);
            session.save(tagEntertainment);
            session.save(tagPolitics);
            session.save(tagNews);
            session.save(testAccountTommy);
            session.save(testAccountTuring);
            session.save(testAccountNeumann);
            session.save(testEventOne);
            session.save(testEventTwo);
            session.save(testEventNotification);
            session.save(testInvitation);
            session.save(testFollowRequestNotification);
            session.save(testGroupRequestNotification);
            session.save(testUserGroupUSC);
            session.save(testUserGroupCS);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
