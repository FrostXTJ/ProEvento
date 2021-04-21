package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity
@Table (name = "group_request_notification")
public class GroupRequestNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonAlias({"id", "notificationId"})
    private long id;

    private String content;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonAlias({"dateTime", "datetime"})
    @Column(name = "datetime")
    private LocalDateTime dateTime;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private User sender;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "group_notification_user",
            joinColumns = { @JoinColumn(name = "notification_id") },
            inverseJoinColumns = { @JoinColumn(name = "receiver_id") }
    )
    private Set<User> receivers;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private UserGroup userGroup;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Set<User> getReceivers() {
        return receivers;
    }

    public void setReceivers(Set<User> receivers) {
        this.receivers = receivers;
    }

    public UserGroup getUserGroup() {
        return userGroup;
    }

    public void setUserGroup(UserGroup userGroup) {
        this.userGroup = userGroup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GroupRequestNotification that = (GroupRequestNotification) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "GroupRequestNotification{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", dateTime=" + dateTime +
                ", sender=" + sender +
                '}';
    }
}
