package com.acme.appstack.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

public class Person
{
  private long id;
  private String firstName;
  private String middleName;
  private String lastName;
  private Date birthday;
  private Gender gender;
  private Ethnicity ethnicity;
  private boolean deceased;

  public long getId()
  {
    return id;
  }

  public void setId(long id)
  {
    this.id = id;
  }

  @NotNull
  @Size(min = 1, max = 80)
  public String getFirstName()
  {
    return firstName;
  }

  public void setFirstName(String firstName)
  {
    this.firstName = firstName;
  }

  public String getMiddleName()
  {
    return middleName;
  }

  public void setMiddleName(String middleName)
  {
    this.middleName = middleName;
  }

  public String getLastName()
  {
    return lastName;
  }

  public void setLastName(String lastName)
  {
    this.lastName = lastName;
  }

//  @JsonSerialize(using=DateSerializer.class)
  public Date getBirthday()
  {
    return birthday;
  }

  public void setBirthday(Date birthday)
  {
    this.birthday = birthday;
  }

  public Gender getGender()
  {
    return gender;
  }

  public void setGender(Gender gender)
  {
    this.gender = gender;
  }

  public Ethnicity getEthnicity()
  {
    return ethnicity;
  }

  public void setEthnicity(Ethnicity ethnicity)
  {
    this.ethnicity = ethnicity;
  }

  public boolean isDeceased()
  {
    return deceased;
  }

  public void setDeceased(boolean deceased)
  {
    this.deceased = deceased;
  }
}
