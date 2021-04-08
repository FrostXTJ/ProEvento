package usc.cs310.ProEvento;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import usc.cs310.ProEvento.model.*;

import java.time.LocalDateTime;
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
            testEventOne.setTag(tagMusic);
            testEventOne.setDateTime(LocalDateTime.of(2021, 5, 1, 12, 0, 0));
            testEventOne.setHost(testUserTommy);
            testUserTuring.registerEvent(testEventOne);

            Event testEventTwo = new Event();
            testEventTwo.setName("The First Video Game!");
            testEventTwo.setCoverImageUrl("");
            testEventTwo.setDescription("The first computer game in the human history!");
            testEventTwo.setStatus("open for registration");
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
            testUserGroupUSC.addMember(testUserNeumann);
            testUserGroupUSC.addMember(testUserTuring);

            UserGroup testUserGroupCS = new UserGroup();
            testUserGroupCS.setName("Computer Scientists Group");
            testUserGroupCS.setFounder(testUserTuring);
            testUserGroupCS.setDescription("User group for computer scientists");
            testUserGroupCS.setAvatarUrl("");
            testUserGroupCS.setTag(tagTech);
            testUserGroupCS.addMember(testUserNeumann);

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
            session.save(testAccountTommy);
            session.save(testAccountTuring);
            session.save(testAccountNeumann);
            session.save(testEventOne);
            session.save(testEventTwo);
            session.save(testInvitation);
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
