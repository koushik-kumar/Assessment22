package com.taskmngr;

import com.taskmngr.db.TasksEntityDAO;
import com.taskmngr.core.TaskEntity;
import com.taskmngr.resources.TasksResource;
import io.dropwizard.Application;
import io.dropwizard.db.PooledDataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

public class TaskManagerApplication extends Application<TaskManagerConfiguration> {

    public static void main(final String[] args) throws Exception {
        new TaskManagerApplication().run(args);
    }

    @Override
    public void initialize(final Bootstrap<TaskManagerConfiguration> bootstrap) {
        bootstrap.addBundle(hibernateBundle);
    }

    private final HibernateBundle<TaskManagerConfiguration> hibernateBundle = new HibernateBundle<TaskManagerConfiguration>(TaskEntity.class) {
        @Override
        public PooledDataSourceFactory getDataSourceFactory(TaskManagerConfiguration taskManagerConfiguration) {
            return taskManagerConfiguration.getDataSourceFactory();
        }
    };

    @Override
    public void run(final TaskManagerConfiguration configuration,
                    final Environment environment) {
        System.out.println("Running");
        final TasksEntityDAO tasksEntityDAO = new TasksEntityDAO(hibernateBundle.getSessionFactory());
        // Enable CORS headers
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");


        environment.jersey().register(new TasksResource(tasksEntityDAO));
    }
}
