package com.taskmngr.resources;

//public class TasksResouce {
//}

import com.codahale.metrics.annotation.Timed;
import com.taskmngr.db.TasksEntityDAO;
import com.taskmngr.core.TaskEntity;
import io.dropwizard.hibernate.UnitOfWork;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TasksResource {

    private final TasksEntityDAO tasksEntityDAO;

    public TasksResource(TasksEntityDAO tasksEntityDAO) {
        this.tasksEntityDAO = tasksEntityDAO;
    }

    @Path("/all")
    @GET
    @Timed
    @UnitOfWork
    public List<TaskEntity> getAllTasks() {
        return tasksEntityDAO.getAllTasks();
    }
//    @Path("get")
//    @GET
//    @Timed
//    @UnitOfWork
//    public TaskEntity getTaskById(Long id) {
//        return tasksEntityDAO.getTaskById(id);
//    }

    @Path("/add")
    @POST
    @UnitOfWork
    public Long addTask(@Valid TaskEntity entity) {
        return tasksEntityDAO.add(entity);
    }

    @Path("/delete")
    @DELETE
    @Timed
    @UnitOfWork
    public Response deleteTask(Long id) {
        tasksEntityDAO.delete(id);
        return Response.ok().entity("\"Success\"").type(MediaType.APPLICATION_JSON).build();
    }
}