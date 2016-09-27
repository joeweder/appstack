package com.acme.appstack.persistence;

import com.acme.appstack.domain.Person;

import java.util.List;

public interface PersonMapper
{
  void insert(Person person);
  Person findById(long id);
  List<Person> findByLastName(String name);
  void update(Person person);
  void deleteById(long id);
}
