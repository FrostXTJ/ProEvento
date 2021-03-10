package usc.cs310.ProEvento.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "account")
public class Account implements Serializable {
    private static final long serialVersionUID = -8017939625361850513L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String password;

    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToOne(mappedBy = "account")
    private User user;
}
