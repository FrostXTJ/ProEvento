package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "usergroup")
public class UserGroup implements Serializable {
    private static final long serialVersionUID = 508821383278178031L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonAlias({"id", "groupId"})
    private long id;

    @Column(unique = true)
    @Size(max = 255)
    private String name;

    private String description;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "founder_id")
    private User founder;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Tag tag;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "group_member_mapping",
            joinColumns = { @JoinColumn(name = "group_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    private Set<User> members;

    public void addMember(User user) {
        if (this.members == null) {
            this.members = new HashSet<>();
        }
        this.members.add(user);
    }

    public void removeMember(User user) {
        if (members != null) {
            members.remove(user);
        }
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public User getFounder() {
        return founder;
    }

    public void setFounder(User founder) {
        this.founder = founder;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    // equals, hashCode, and toString override.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroup userGroup = (UserGroup) o;
        return id == userGroup.id && Objects.equals(name, userGroup.name) && Objects.equals(description, userGroup.description) && Objects.equals(avatarUrl, userGroup.avatarUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, avatarUrl);
    }

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                '}';
    }
}
