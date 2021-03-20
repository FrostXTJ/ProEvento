package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user")
public class User implements Serializable {
    private static final long serialVersionUID = -1381503967343439764L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonAlias({"id", "userId"})
    private Long id;

    private String username;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String biography;

    private String status;

    @Column(name = "enable_notification")
    private boolean enableNotifications;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "current_event_id")
    private Event currentEvent;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_tag",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") }
    )
    private Set<Tag> tags;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_network",
            joinColumns = { @JoinColumn(name = "follower_id") },
            inverseJoinColumns = { @JoinColumn(name = "followee_id") }
    )
    private Set<User> following;

    @JsonIgnore
    @ManyToMany(mappedBy = "following", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Set<User> followers;

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
        event.addGuest(this);
    }

    public void unregisterEvent(Event event) {
        event.removeGuest(this);
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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
