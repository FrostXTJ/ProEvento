package usc.cs310.ProEvento.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "notification")
public class Notification implements Serializable {
    private static final long serialVersionUID = 7740959286390410434L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String content;

    @Column(name = "datetime")
    private LocalDateTime dateTime;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User sender;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Event event;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "notification_user",
            joinColumns = { @JoinColumn(name = "notification_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    private List<User> receivers;
}
