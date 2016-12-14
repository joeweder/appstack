package com.acme.appstack.web;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/service/menu")
public class MenuController
{
  @RequestMapping(method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
  public String find(@RequestParam("id") int id)
  {
    return "you asked for menu-id '" + id + "'.";
  }
}
