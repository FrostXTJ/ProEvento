package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "account")
public class Account implements Serializable {
    private static final long serialVersionUID = -7222527982210391773L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonAlias({"id", "accountId"})
    private long id;

    @Column(unique = true)
    @Size(max = 255)
    private String email;

    @Column(name = "phone_number", unique = true)
    @Size(max = 15)
    private String phoneNumber;

    private String password;

    private boolean deactivated;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private User user;

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isDeactivated() {
        return deactivated;
    }

    public void setDeactivated(boolean deactivated) {
        this.deactivated = deactivated;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id && Objects.equals(password, account.password) && Objects.equals(email, account.email) && Objects.equals(phoneNumber, account.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, password, email, phoneNumber);
    }
}
