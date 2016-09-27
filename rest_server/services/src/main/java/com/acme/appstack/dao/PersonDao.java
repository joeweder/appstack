package com.acme.appstack.dao;

import com.acme.appstack.domain.Person;

import java.util.List;

public interface PersonDao
{
  Person insert(Person person);
  Person findById(long id);
  List<Person> findByLastName(String name);
  Person update(Person person);
  void deleteById(long id);
}
