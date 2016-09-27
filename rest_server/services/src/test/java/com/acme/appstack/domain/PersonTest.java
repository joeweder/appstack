package com.acme.appstack.domain;

import org.junit.BeforeClass;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.Assert.*;

public class PersonTest
{
  private static Validator validator;

  @BeforeClass
  public static void setUp() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  @Test
  public void testFirstNameValid() throws Exception
  {
    Person person = new Person();

    Set<ConstraintViolation<Person>> constraintViolations =
      validator.validate(person);

    assertEquals( 1, constraintViolations.size() );
    assertEquals(
      "may not be null",
      constraintViolations.iterator().next().getMessage()
    );

  }
}