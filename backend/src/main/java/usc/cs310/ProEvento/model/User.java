package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
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
    private long id;

    @Column(unique = true)
    @Size(max = 255)
    private String username;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String biography;

    private String status;

    @Column(name = "badge_fun_count")
    private long badgeFunCount;

    @Column(name = "badge_cool_count")
    private long badgeCoolCount;

    @Column(name = "badge_helpful_count")
    private long badgeHelpfulCount;

    @Column(name = "badge_lovely_count")
    private long badgeLovelyCount;

    @Column(name = "badge_charming_count")
    private long badgeCharmingCount;

    @Column(name = "badge_awesome_count")
    private long badgeAwesomeCount;

    @Column(name = "badge_energetic_count")
    private long badgeEnergeticCount;

    @Column(name = "badge_smart_count")
    private long badgeSmartCount;

    @Column(name = "badge_dull_count")
    private long badgeDullCount;

    @Column(name = "badge_rude_count")
    private long badgeRudeCount;

    @Column(name = "enable_notification")
    private boolean enableNotifications;

    @JsonIgnore
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
        if (this.following != null) {
            this.following.remove(otherUser);
        }
        if (otherUser.followers != null) {
            otherUser.followers.remove(this);
        }
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

    public void addFunBadge() {
        badgeFunCount++;
    }

    public void addCoolBadge() {
        badgeCoolCount++;
    }

    public void addHelpfulBadge() {
        badgeHelpfulCount++;
    }

    public void addCharmingBadge() {
        badgeCharmingCount++;
    }

    public void addAwesomeBadge() {
        badgeAwesomeCount++;
    }

    public void addEnergeticBadge() {
        badgeEnergeticCount++;
    }

    public void addSmartBadge() {
        badgeSmartCount++;
    }

    public void addDullBadge() {
        badgeDullCount++;
    }

    public void addRudeBadge() {
        badgeRudeCount++;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public long getBadgeFunCount() {
        return badgeFunCount;
    }

    public void setBadgeFunCount(long badgeFunCount) {
        this.badgeFunCount = badgeFunCount;
    }

    public long getBadgeCoolCount() {
        return badgeCoolCount;
    }

    public void setBadgeCoolCount(long badgeCoolCount) {
        this.badgeCoolCount = badgeCoolCount;
    }

    public long getBadgeHelpfulCount() {
        return badgeHelpfulCount;
    }

    public void setBadgeHelpfulCount(long badgeHelpfulCount) {
        this.badgeHelpfulCount = badgeHelpfulCount;
    }

    public long getBadgeLovelyCount() {
        return badgeLovelyCount;
    }

    public void setBadgeLovelyCount(long badgeLovelyCount) {
        this.badgeLovelyCount = badgeLovelyCount;
    }

    public long getBadgeCharmingCount() {
        return badgeCharmingCount;
    }

    public void setBadgeCharmingCount(long badgeCharmingCount) {
        this.badgeCharmingCount = badgeCharmingCount;
    }

    public long getBadgeAwesomeCount() {
        return badgeAwesomeCount;
    }

    public void setBadgeAwesomeCount(long badgeAwesomeCount) {
        this.badgeAwesomeCount = badgeAwesomeCount;
    }

    public long getBadgeEnergeticCount() {
        return badgeEnergeticCount;
    }

    public void setBadgeEnergeticCount(long badgeEnergeticCount) {
        this.badgeEnergeticCount = badgeEnergeticCount;
    }

    public long getBadgeDullCount() {
        return badgeDullCount;
    }

    public void setBadgeDullCount(long badgeDullCount) {
        this.badgeDullCount = badgeDullCount;
    }

    public long getBadgeRudeCount() {
        return badgeRudeCount;
    }

    public void setBadgeRudeCount(long badgeRudeCount) {
        this.badgeRudeCount = badgeRudeCount;
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

    // equals, hashCode, and toString override.
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
}
