package com.acme.appstack.web;

import com.acme.appstack.config.WebMvcConfig;
import com.acme.appstack.domain.Person;
import com.acme.appstack.services.PersonService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*
  Can also load configuration from static inner Config class
    @Configuration
    static class Config {

        // this bean will be injected into the OrderServiceTest class
        @Bean
        public OrderService orderService() {
            OrderService orderService = new OrderServiceImpl();
            // set properties, etc.
            return orderService;
        }
    }
*/

@RunWith(SpringJUnit4ClassRunner.class)
//@BaseControllerTest
@WebAppConfiguration
@ContextConfiguration(classes = {WebMvcConfig.class})
public class PersonControllerTest
{
//  @Autowired
//  private WebApplicationContext wac;

  private MockMvc mockMvc;

  @Mock
  private PersonService personService;

  @Before
  public void setUp() throws Exception
  {
    MockitoAnnotations.initMocks(this);
    PersonController controller = new PersonController();
    controller.setPersonService(personService);
//    Using webAppContextSetup(wac) technique, not able to inject the mock personService
//    It works but it becomes an integration test and the personService goes to the database
//    11.3.6 Spring MVC Test Framework says the webAppContextSetup(wac) is much more complete test of the configuration
//    mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  public void testFind() throws Exception {
    Person p = new Person();
    p.setLastName("TestLastName");

    List<Person> results = new ArrayList<Person>();
    results.add(p);

    when(personService.findByLastName("TestLastName")).thenReturn(results);

    ResultActions resultActions = mockMvc.perform(get("/service/person/").param("name", "TestLastName").accept(MediaType.parseMediaType("application/json;charset=UTF-8")));
    resultActions.andExpect(status().isOk());
    resultActions.andExpect(content().contentType("application/json;charset=UTF-8"));
    resultActions.andExpect(jsonPath("$..[0].lastName").value("TestLastName"));
  }
}