package com.acme.appstack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;

import javax.sql.DataSource;

@Configuration
@Profile("production-jndi")
public class JNDIDataSource implements DataSourceConfig
{
  @Bean
  public DataSource dataSource() {
    JndiDataSourceLookup dsLookup = new JndiDataSourceLookup();
    dsLookup.setResourceRef(true);

    return dsLookup.getDataSource("java:/comp/env/jdbc/myJndiDataSourceName");
  }
}
