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
            session.beginTransaction();

            Tag tagGame = new Tag();
            tagGame.setName("Video Game");
            tagGame.setDescription("Video game lovers");
            Tag tagMusic = new Tag();
            tagMusic.setName("Music");
            tagMusic.setDescription("Music lovers");
            Tag tagDance = new Tag();
            tagDance.setName("Dance");
            tagDance.setDescription("Let's dance!");

            User testUserTommy = new User();
            testUserTommy.setUsername("Tommy Trojan");
            testUserTommy.setBiography("USC fight on!");
            testUserTommy.setAvatarUrl("");
            testUserTommy.setStatus("Free");
            testUserTommy.setTags(Set.of(tagGame, tagMusic, tagDance));
            testUserTommy.setEnableNotifications(true);

            User testUserTuring = new User();
            testUserTuring.setUsername("Turing");
            testUserTuring.setBiography("Hello world!");
            testUserTuring.setAvatarUrl("");
            testUserTuring.setStatus("Free");
            testUserTuring.setTags(Set.of(tagGame));
            testUserTuring.setEnableNotifications(true);

            User testUserNeumann = new User();
            testUserNeumann.setUsername("Neumann");
            testUserNeumann.setBiography("Hi, I am new to ProEvento!");
            testUserNeumann.setAvatarUrl("");
            testUserNeumann.setStatus("Free");
            testUserNeumann.setTags(Set.of(tagMusic, tagGame));
            testUserNeumann.setEnableNotifications(true);

            Account testAccountTommy = new Account();
            testAccountTommy.setEmail("tommy@usc.edu");
            testAccountTommy.setPhoneNumber("111-111-1111");
            testAccountTommy.setPassword("uscfighton!");
            testAccountTommy.setUser(testUserTommy);
            testUserTommy.setAccount(testAccountTommy);

            Account testAccountTuring = new Account();
            testAccountTuring.setEmail("alanturing@mail.com");
            testAccountTuring.setPhoneNumber("123-456-7890");
            testAccountTuring.setPassword("helloworld123");
            testAccountTuring.setUser(testUserTuring);
            testUserTuring.setAccount(testAccountTuring);

            Account testAccountNeumann = new Account();
            testAccountNeumann.setEmail("johnneumann@mail.com");
            testAccountNeumann.setPhoneNumber("000-000-0000");
            testAccountNeumann.setPassword("111111");
            testAccountNeumann.setUser(testUserNeumann);
            testUserNeumann.setAccount(testAccountNeumann);

            testUserTuring.follow(testUserTommy);
            testUserNeumann.follow(testUserTommy);
            testUserNeumann.follow(testUserTuring);

            Event testEventOne = new Event();
            testEventOne.setName("Best Songs for CSCI 310");
            testEventOne.setThumbnailUrl("");
            testEventOne.setDescription("What is the best song in CSCI 310?");
            testEventOne.setStatus("open for registration");
            testEventOne.setTwilioRoomUrl("");
            testEventOne.setTag(tagMusic);
            testEventOne.setDateTime(LocalDateTime.of(2021, 5, 1, 12, 0, 0));
            testUserTommy.hostEvent(testEventOne);
            testUserTuring.registerEvent(testEventOne);

            Event testEventTwo = new Event();
            testEventTwo.setName("The First Video Game!");
            testEventTwo.setThumbnailUrl("");
            testEventTwo.setDescription("The first computer game in the human history!");
            testEventTwo.setStatus("open for registration");
            testEventTwo.setTwilioRoomUrl("");
            testEventTwo.setTag(tagGame);
            testEventTwo.setDateTime(LocalDateTime.of(2021, 12, 21, 10, 0, 0));
            testUserTommy.hostEvent(testEventTwo);

            Notification testNotification = new Notification();
            testNotification.setSender(testUserTommy);
            testNotification.setContent("I am going to host a brand new event! Let's check it out!");
            testNotification.setEvent(testEventOne);
            testNotification.setDateTime(LocalDateTime.of(2021, 03, 15, 13, 10, 10));
            testNotification.setReceivers(testUserTommy.getFollowers());

            session.save(tagGame);
            session.save(tagMusic);
            session.save(tagDance);
            session.save(testAccountTommy);
            session.save(testAccountTuring);
            session.save(testAccountNeumann);
            session.save(testUserTommy);
            session.save(testUserTuring);
            session.save(testUserNeumann);
            session.save(testEventOne);
            session.save(testEventTwo);
            session.save(testNotification);
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
