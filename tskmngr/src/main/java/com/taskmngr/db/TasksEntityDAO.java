package com.taskmngr.db;

import com.taskmngr.core.TaskEntity;
import io.dropwizard.hibernate.AbstractDAO;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SessionFactory;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public class TasksEntityDAO extends AbstractDAO<TaskEntity>{

    public TasksEntityDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public List<TaskEntity>  getAllTasks(){
        return list(namedTypedQuery("com.taskmngr.core.TaskEntity.findAll"));
    }

    public Long add(TaskEntity taskEntity){

        return (Long) currentSession().save(taskEntity);
    }

    public void delete(Long id){
        namedTypedQuery("com.taskmngr.core.TaskEntity.delete");
    }

}
