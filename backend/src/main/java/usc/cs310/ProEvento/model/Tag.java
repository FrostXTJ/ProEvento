package usc.cs310.ProEvento.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tag")
public class Tag implements Serializable {
    private static final long serialVersionUID = 414784324986980630L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;

    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
