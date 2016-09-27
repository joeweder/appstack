package com.acme.appstack.web;

import com.acme.appstack.domain.Person;
import com.acme.appstack.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value="/service/person")
public class PersonController
{
  @Autowired
  private PersonService personService;

  public PersonService getPersonService()
  {
    return personService;
  }

  public void setPersonService(PersonService personService)
  {
    this.personService = personService;
  }

  @RequestMapping(method=RequestMethod.POST)
  public Person insert(@RequestBody @Valid Person person)
  {
    return getPersonService().insert(person);
  }

  @RequestMapping(method = RequestMethod.GET)
  public List<Person> find(@RequestParam(value="name", defaultValue="") String name)
  {
    List<Person> results = getPersonService().findByLastName(name);

    //NOTE: This is not good behavior. I'm only demonstrating the @ControllerAdvice ErrorHandler
    if(results.isEmpty())
    {
      throw new RuntimeException("Could not find any person with last name like '" + name + "'!");
    }

    return getPersonService().findByLastName(name);
  }

  @RequestMapping(method=RequestMethod.PUT)
  public Person update(@RequestBody @Valid Person person)
  {
    return getPersonService().update(person);
  }

  @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
  @ResponseStatus(value = HttpStatus.OK)
  public void delete(@PathVariable("id") Long id)
  {
    if(null == getPersonService().findById(id))
    {
      throw new RuntimeException("Could not find any person with id '" + id + "'!");
    }

    getPersonService().deleteById(id);
  }
}
