package usc.cs310.ProEvento.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "tag")
public class Tag implements Serializable {
    private static final long serialVersionUID = 3758241589517933651L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonAlias({"id", "tagId"})
    private long id;

    @Size(max = 255)
    private String name;

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

    // equals, hashCode, and toString override.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return id == tag.id && Objects.equals(name, tag.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
