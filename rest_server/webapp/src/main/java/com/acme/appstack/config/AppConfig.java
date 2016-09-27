package com.acme.appstack.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@ComponentScan(basePackages = "com.acme.appstack")
//@Import(SecurityConfig.class)
//@ImportResource("classpath:/com/acme/properties-config.xml")
//@PropertySource("classpath:/com/acme/appstack/app.properties")
@MapperScan("com.acme.appstack.persistence")
public class AppConfig
{
  @Autowired
  DataSourceConfig dataSourceConfig;

  @Bean(name = {"jdbcTemplate", "jdbctemplate"})
  @Description("Not really doing anything with this bean except showing annotation options")
  public JdbcTemplate jdbcTemplate()
  {
    return new JdbcTemplate(dataSourceConfig.dataSource());
  }

  @Bean
  public DataSourceTransactionManager transactionManager()
  {
    return new DataSourceTransactionManager(dataSourceConfig.dataSource());
  }

  @Bean
  public SqlSessionFactoryBean sqlSessionFactory() throws Exception
  {
    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
    sessionFactory.setDataSource(dataSourceConfig.dataSource());
//    sessionFactory.setTypeAliasesPackage("org.somepackage");
    return sessionFactory;
  }
}
