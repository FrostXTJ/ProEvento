package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class User implements Serializable {
    private static final long serialVersionUID = 5359261218277842172L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String username;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String biography;

    private String status;

    @Column(name = "enable_notification")
    private boolean enableNotifications;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
    @JoinColumn(unique = true)
    private Account account;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Event currentEvent;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_tag",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") }
    )
    private Set<Tag> tags;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_network",
            joinColumns = { @JoinColumn(name = "follower_id") },
            inverseJoinColumns = { @JoinColumn(name = "followee_id") }
    )
    private Set<User> following;

    @ManyToMany(mappedBy = "following", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<User> followers;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Event> hostEvents;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_registered_event",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "event_id") }
    )
    private Set<Event> registeredEvents;

    public void follow(User otherUser) {
        if (this.following == null) {
            this.following = new HashSet<>();
        }
        if (otherUser.followers == null) {
            otherUser.followers = new HashSet<>();
        }
        this.following.add(otherUser);
        otherUser.followers.add(this);
    }

    public void unfollow(User otherUser) {
        this.following.remove(otherUser);
        otherUser.followers.remove(this);
    }

    public void registerEvent(Event event) {
        if (this.registeredEvents == null) {
            this.registeredEvents = new HashSet<>();
        }
        this.registeredEvents.add(event);
        event.addGuest(this);
    }

    public void unregisterEvent(Event event) {
        this.registeredEvents.remove(event);
        event.removeGuest(this);
    }

    public void hostEvent(Event event) {
        if (this.hostEvents == null) {
            this.hostEvents = new HashSet<>();
        }
        event.setHost(this);
        this.hostEvents.add(event);
    }

    public void joinEvent(Event event) {
        this.currentEvent = event;
        this.status = "In an event";
    }

    public void leaveEvent(Event event) {
        this.currentEvent = null;
        this.status = "Free";
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isEnableNotifications() {
        return enableNotifications;
    }

    public void setEnableNotifications(boolean enableNotifications) {
        this.enableNotifications = enableNotifications;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Event getCurrentEvent() {
        return currentEvent;
    }

    public void setCurrentEvent(Event currentEvent) {
        this.currentEvent = currentEvent;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<User> getFollowing() {
        return following;
    }

    public void setFollowing(Set<User> following) {
        this.following = following;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Set<Event> getHostEvents() {
        return hostEvents;
    }

    public void setHostEvents(Set<Event> hostEvents) {
        this.hostEvents = hostEvents;
    }

    public Set<Event> getRegisteredEvents() {
        return registeredEvents;
    }

    public void setRegisteredEvents(Set<Event> registeredEvents) {
        this.registeredEvents = registeredEvents;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", biography='" + biography + '\'' +
                ", Status='" + status + '\'' +
                ", enableNotifications=" + enableNotifications +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && enableNotifications == user.enableNotifications && Objects.equals(username, user.username) && Objects.equals(avatarUrl, user.avatarUrl) && Objects.equals(biography, user.biography) && Objects.equals(status, user.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, avatarUrl, biography, status, enableNotifications);
    }
}
