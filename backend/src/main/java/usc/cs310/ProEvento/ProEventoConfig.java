package usc.cs310.ProEvento;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import javax.sql.DataSource;
import java.util.Properties;
import java.util.Scanner;

@Configuration
public class ProEventoConfig {

    @Bean(name = "dataSource")
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://proevento-database.cxltcwdqro1c.us-east-2.rds.amazonaws.com:3306/proevento?createDatabaseIfNotExist=true&serverTimezone=UTC&characterEncoding=utf8");

        // Read database credentials.
//        Scanner scanner = new Scanner(System.in);
//        System.out.print("Input database admin username: ");
//        String username = scanner.nextLine();
//        System.out.print("Input database admin password: ");
//        String password = scanner.nextLine();
        String username = "ProEventoAdmin";
        String password = "o67FhaOpkzAIw3jaF74t";

        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean(name = "sessionFactory")
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setPackagesToScan("usc.cs310.ProEvento.model");
        sessionFactory.setHibernateProperties(hibernateProperties());
        return sessionFactory;
    }

    private final Properties hibernateProperties() {
        Properties hibernateProperties = new Properties();
//        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "create");  // Used for creating new tables.
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "validate");  // Used for validating database schemes.
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        return hibernateProperties;
    }
}