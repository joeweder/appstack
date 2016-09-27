package com.acme.appstack.dao;

import com.acme.appstack.domain.Ethnicity;
import com.acme.appstack.domain.Gender;
import com.acme.appstack.domain.Person;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.*;

@RunWith(SpringJUnit4ClassRunner.class)
//@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@Transactional
@ContextConfiguration("classpath:testApplicationContext.xml")
@SqlGroup({
  @Sql(scripts = "/com/acme/appstack/dao/test-person-data.sql",
  executionPhase = BEFORE_TEST_METHOD),
  @Sql(
    scripts = "/com/acme/appstack/dao/reset-person-data.sql",
    executionPhase = AFTER_TEST_METHOD)
})
public class PersonDaoImplTest
{
  @Autowired
  private PersonDao dao;

  @Autowired
  private SqlSessionTemplate sqlSessionTemplate;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Before
  public void setUp() throws Exception
  {
//    sqlSessionTemplate.getConfiguration().setCacheEnabled(false);
//    sqlSessionTemplate.getConfiguration().setLocalCacheScope(LocalCacheScope.STATEMENT);
//    assertFalse("expected myBatis cache to be disabled", sqlSessionTemplate.getConfiguration().isCacheEnabled());
  }

  @Rollback(true)
  @Test
  public void testInsert() throws Exception
  {
    assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "PERSON"));

    assertNull(dao.insert(null));

    Person person = new Person();
    person.setFirstName("firstName");
    person.setMiddleName("middleName");
    person.setLastName("lastName");
    person.setGender(Gender.MALE);
    person.setEthnicity(Ethnicity.ASIAN);

    Person insertedPerson = dao.insert(person);
    assertNotNull(insertedPerson);
    assertEquals(2, insertedPerson.getId());
    assertEquals(person.getFirstName(), insertedPerson.getFirstName());
    assertEquals(person.getMiddleName(), insertedPerson.getMiddleName());
    assertEquals(person.getLastName(), insertedPerson.getLastName());
    assertEquals(person.getGender(), insertedPerson.getGender());
    assertEquals(person.getEthnicity(), insertedPerson.getEthnicity());
    assertEquals(person.isDeceased(), insertedPerson.isDeceased());
  }

  @Rollback(true)
  @Test
  public void testFindById() throws Exception
  {
    assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "PERSON"));
    assertNull(dao.findById(0));

    Person person = dao.findById(1);
    assertNotNull(person);
    assertEquals(1, person.getId());
    assertEquals("Bob", person.getFirstName());
    assertEquals("X", person.getMiddleName());
    assertEquals("Jones", person.getLastName());
    assertEquals(Gender.FEMALE, person.getGender());
    assertEquals(Ethnicity.CAUCASIAN, person.getEthnicity());
    assertFalse(person.isDeceased());
  }

  @Rollback(true)
  @Test
  public void testFindByName() throws Exception
  {
    assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "PERSON"));
    List<Person> persons = dao.findByLastName(null);
    assertNotNull(persons);
    assertEquals(1, persons.size());
    assertEquals(1, persons.get(0).getId());
    assertEquals("Bob", persons.get(0).getFirstName());
    assertEquals("X", persons.get(0).getMiddleName());
    assertEquals("Jones", persons.get(0).getLastName());

    persons = dao.findByLastName("Jones");
    assertNotNull(persons);
    assertEquals(1, persons.size());
    assertEquals(1, persons.get(0).getId());
    assertEquals("Bob", persons.get(0).getFirstName());
    assertEquals("X", persons.get(0).getMiddleName());
    assertEquals("Jones", persons.get(0).getLastName());
  }

  @Rollback(true)
  @Test
  public void testUpdate() throws Exception
  {
    Person person = dao.findById(1);
    assertNotNull(person);
    assertEquals(1, person.getId());
    assertEquals("Bob", person.getFirstName());
    assertEquals("X", person.getMiddleName());
    assertEquals("Jones", person.getLastName());
    assertEquals(Gender.FEMALE, person.getGender());
    assertEquals(Ethnicity.CAUCASIAN, person.getEthnicity());
    assertFalse(person.isDeceased());

    Date date = new Date();
    person.setFirstName("firstName");
    person.setMiddleName("middleName");
    person.setLastName("lastName");
    person.setBirthday(date);
    person.setGender(Gender.MALE);
    person.setEthnicity(Ethnicity.OTHER);
    person.setDeceased(true);

    dao.update(person);
    Person updatedPerson = dao.findById(1);
    assertNotNull(updatedPerson);
    assertEquals(person.getId(), updatedPerson.getId());
    assertEquals(person.getFirstName(), updatedPerson.getFirstName());
    assertEquals(person.getMiddleName(), updatedPerson.getMiddleName());
    assertEquals(person.getLastName(), updatedPerson.getLastName());
    assertEquals(person.getGender(), updatedPerson.getGender());
    assertEquals(person.getEthnicity(), updatedPerson.getEthnicity());
    assertEquals(person.isDeceased(), updatedPerson.isDeceased());
  }

  @Rollback(true)
  @Test
  public void testDeleteById() throws Exception
  {
    Person person = dao.findById(100);
    assertNull(person);

    dao.deleteById(100);

    person = dao.findById(1);
    assertNotNull(person);
    assertEquals(1, person.getId());

    dao.deleteById(person.getId());
    assertNull(dao.findById(1));
  }
}