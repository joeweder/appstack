package com.acme.appstack.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@Profile("production-jdbc")
@PropertySource("classpath:jdbc.properties")
public class JdbcDataSourceConfig implements DataSourceConfig
{
  @Value("${jdbc.url}")
  private String url;

  @Value("${jdbc.username}")
  private String username;

  @Value("${jdbc.password}")
  private String password;

  @Bean
  public DataSource dataSource() {
    return new DriverManagerDataSource(url, username, password);
  }
}
