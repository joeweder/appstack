This is an attempt to use the latest and greatest best-of-breed technologies for web app development.
August 2016

Note: This version requires JDK 1.8

User Interface: Single-Page application using HTML 5, JavaScript ES6, ReactJS, react-router, Redux, etc.
REST Server: Spring MVC 4 REST Services, JavaConfig (no web.xml), MyBatis data-access mapping.
	Marshalling is completely handled by the a MappingJackson implementation of Spring's message converter
	There are no artificial data-transfer objects and therefore no overhead for authoring converters to/from domain to/from DTO

It is designed to be deployed in two separate servers: one for the back-end REST server and one for the User-interface.
Note: This deployement will violate the same origin policy enforced by browsers on JavaScript (AJAX request to another domain)
	The REST server will need to either have the client server as a CORS allowed origin or (preferably) utilize a proxy servlet in the client server.

REST Server	
	JSON and XML support (distinguished by http header)
	Accept and Content-Type = application/json OR
	Accept and Content-Type = application/xml

	Standard (?) REST API
	URI = http://localhost:8080/appstack/service/person/
	GET to obtain one or more results
	POST to create
	PUT to update
	DELETE id to delete

	Build/Run
	mvn clean install in model, then services, then 'mvn clean jetty:run' in restangle-webapp
	View in browser: http://localhost:8080/appstack/index.html

Client
	

TODO List:
* testing web controllers
	DONE: see PersonControllerTest. Mocking PersonController's PersonService so we can isolate the web layer.
	
* Security

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
</dependency>