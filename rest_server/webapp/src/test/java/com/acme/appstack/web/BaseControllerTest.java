package com.acme.appstack.web;

import com.acme.appstack.config.WebMvcConfig;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@WebAppConfiguration
@ContextConfiguration(classes = {WebMvcConfig.class})
public @interface BaseControllerTest
{
/*
  @RunWith(SpringJUnit4ClassRunner.class)
  @BaseControllerTest
  public class ExampleTest { }
*/
}
