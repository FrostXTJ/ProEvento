package usc.cs310.ProEvento.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user")
public class User implements Serializable {
    private static final long serialVersionUID = 4999948174072390810L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String username;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String biography;

    private String Status;

    @Column(name = "enable_notification")
    private boolean enableNotifications;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private Account account;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Event currentEvent;

    @ManyToMany
    @JoinTable(
            name = "user_tag",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") }
    )
    private List<Tag> tags;

    @ManyToMany
    @JoinTable(
            name = "user_network",
            joinColumns = { @JoinColumn(name = "follower_id") },
            inverseJoinColumns = { @JoinColumn(name = "followee_id") }
    )
    private List<User> following;

    @ManyToMany(mappedBy = "following")
    private List<User> followers;

    @OneToMany(mappedBy = "host")
    private List<Event> hostEvents;

    @ManyToMany
    @JoinTable(
            name = "user_registered_event",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "event_id") }
    )
    private List<Event> registeredEvents;

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
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
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

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }

    public List<Event> getHostEvents() {
        return hostEvents;
    }

    public void setHostEvents(List<Event> hostEvents) {
        this.hostEvents = hostEvents;
    }

    public List<Event> getRegisteredEvents() {
        return registeredEvents;
    }

    public void setRegisteredEvents(List<Event> registeredEvents) {
        this.registeredEvents = registeredEvents;
    }
}
