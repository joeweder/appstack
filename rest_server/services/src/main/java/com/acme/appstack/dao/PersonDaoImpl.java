package com.acme.appstack.dao;

import com.acme.appstack.domain.Person;
import com.acme.appstack.persistence.PersonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("personDao")
public class PersonDaoImpl implements PersonDao
{
  private PersonMapper mapper;

  public PersonMapper getMapper()
  {
    return mapper;
  }

  @Autowired
  public void setMapper(PersonMapper mapper)
  {
    this.mapper = mapper;
  }

  @Override
  public Person insert(Person person)
  {
    if(null != person)
    {
      getMapper().insert(person);
      return person;
    }

    return null;
  }

  @Override
  public Person findById(long id)
  {
    return getMapper().findById(id);
  }

  @Override
  public List<Person> findByLastName(String name)
  {
    String searchValue = (null != name ? "%" + name + "%" : "%");
    return getMapper().findByLastName(searchValue);
  }

  @Override
  public Person update(Person person)
  {
    if(null != person)
    {
      getMapper().update(person);
      return person;
    }

    return null;
  }

  @Override
  public void deleteById(long id)
  {
    getMapper().deleteById(id);
  }
}
