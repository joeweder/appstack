package com.acme.appstack.initializer;

import com.acme.appstack.config.AppConfig;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class AppInitializer implements WebApplicationInitializer
{
  @Override
  public void onStartup(ServletContext servletContext) throws ServletException
  {
    WebApplicationContext context = getContext(servletContext);
    servletContext.addListener(new ContextLoaderListener(context));
    ServletRegistration.Dynamic dispatcher = servletContext.addServlet("appstack", new DispatcherServlet(context));
    dispatcher.setLoadOnStartup(1);
    dispatcher.addMapping("/");
  }

  private WebApplicationContext getContext(ServletContext servletContext) {
    AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
    context.getEnvironment().setDefaultProfiles("developer");
    context.setServletContext(servletContext);
    context.register(AppConfig.class);

    return context;
  }
}