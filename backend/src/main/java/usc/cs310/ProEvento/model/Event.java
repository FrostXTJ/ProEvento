package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "event")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Event implements Serializable {
    private static final long serialVersionUID = -9023730976247511349L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "like_count")
    private int likeCount;

    private String name;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    private String description;

    private String status;

    @Column(name = "twilio_room_url")
    private String twilioRoomUrl;

    @Column(name = "datetime")
    private LocalDateTime dateTime;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Tag tag;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User host;

    @ManyToMany(mappedBy = "registeredEvents", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<User> guests;

    public void addGuest(User guest) {
        if (this.guests == null) {
            this.guests = new HashSet<>();
        }
        this.guests.add(guest);
    }

    public void removeGuest(User guest) {
        guests.remove(guest);
    }

    public void evictGuest(User guest) {
        if (guest.getCurrentEvent() == this) {
            guest.leaveEvent(this);
        }
    }

    public void start() {
        this.status = "started";
    }

    public void end() {
        this.status = "terminated";
    }

    public void cancel() {
        this.status = "cancelled";
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTwilioRoomUrl() {
        return twilioRoomUrl;
    }

    public void setTwilioRoomUrl(String twilioRoomUrl) {
        this.twilioRoomUrl = twilioRoomUrl;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public Set<User> getGuests() {
        return guests;
    }

    public void setGuests(Set<User> guests) {
        this.guests = guests;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", likeCount=" + likeCount +
                ", name='" + name + '\'' +
                ", thumbnailUrl='" + thumbnailUrl + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", twilioRoomUrl='" + twilioRoomUrl + '\'' +
                ", dateTime=" + dateTime +
                ", tag=" + tag +
                ", host=" + host +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return id == event.id && likeCount == event.likeCount && Objects.equals(name, event.name) && Objects.equals(thumbnailUrl, event.thumbnailUrl) && Objects.equals(description, event.description) && Objects.equals(status, event.status) && Objects.equals(twilioRoomUrl, event.twilioRoomUrl) && Objects.equals(dateTime, event.dateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, likeCount, name, thumbnailUrl, description, status, twilioRoomUrl, dateTime);
    }
}
