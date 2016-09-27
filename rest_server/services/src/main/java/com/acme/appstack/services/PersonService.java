package com.acme.appstack.services;

import com.acme.appstack.domain.Person;

import java.util.List;

public interface PersonService
{
  Person insert(Person person);
  Person findById(long id);
  List<Person> findByLastName(String name);
  Person update(Person person);
  void deleteById(long id);
}
