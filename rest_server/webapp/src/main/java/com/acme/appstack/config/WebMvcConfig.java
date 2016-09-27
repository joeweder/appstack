package com.acme.appstack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter
{
  @Bean
  public RestOperations restOperations()
  {
    return new RestTemplate();
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedMethods("GET", "PUT", "POST", "DELETE")
      .allowedOrigins("*");
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry)
  {
    registry.addResourceHandler("/html/**").addResourceLocations("/html/");
    registry.addResourceHandler("/js/**").addResourceLocations("/js/");
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
  {
    converters.add(createXmlHttpMessageConverter());
    converters.add(createJsonHttpMessageConverter());

    super.configureMessageConverters(converters);
  }

  //this may be redundant to the default behavior if we have the required dependency in the classpath
  private HttpMessageConverter<Object> createJsonHttpMessageConverter()
  {
    return new MappingJackson2HttpMessageConverter();
  }

  //this may be redundant to the default behavior if we have the required dependency in the classpath
  private HttpMessageConverter<Object> createXmlHttpMessageConverter()
  {
    return new MappingJackson2XmlHttpMessageConverter();
  }
}