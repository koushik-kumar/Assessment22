package com.taskmngr.core;

import javax.persistence.*;
import java.util.Date;

@Entity // entity name of the table to be used in the code
@Table(name = "public.tasks_database")  // name of the table in the database
@NamedQueries({
        @NamedQuery(
                name = "com.taskmngr.core.TaskEntity.findAll",
                query = "SELECT t FROM TaskEntity t"
        ),
        @NamedQuery(
                name = "com.taskmngr.core.TaskEntity.delete",
                query = "DELETE FROM TaskEntity t WHERE t.id = :id"
        )
})

public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "status", nullable = false)
    private Boolean status;

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

}
