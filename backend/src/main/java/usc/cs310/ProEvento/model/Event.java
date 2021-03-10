package usc.cs310.ProEvento.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "event")
public class Event implements Serializable {
    private static final long serialVersionUID = -1570550848065090039L;

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

    @ManyToMany(mappedBy = "registeredEvents")
    private List<User> guest;

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

    public List<User> getGuest() {
        return guest;
    }

    public void setGuest(List<User> guest) {
        this.guest = guest;
    }
}
