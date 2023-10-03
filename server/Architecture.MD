# Backend Server Architecture Design Document

## Introduction

The purpose of this document is to describe the high-level architecture of the backend server for our project. It will include folder structure, component organization, technologies used, and key design decisions.

## MVC Architecture

Our backend application will follow a variation of the MVC (Model-View-Controller) pattern known as the "MVC with API" or "MVC with JSON" architecture. In this variation, the View component is replaced with APIs (Application Programming Interfaces) that return JSON data instead of HTML views.

**Model (M):** The Model represents the application's data and business logic. It is responsible for defining data structures, data validation, and interactions with the database.

**Controller (C):** The Controller component process incoming HTTP requests, handles application logic, and interact with the Model. However, in this variation, instead of rendering HTML views, it is responsible for formatting the Model's data into JSON responses.

**API (No View):** In this variation, the View component is replaced by APIs. These APIs are endpoints exposed by the server that return data in JSON format when requested. Each API endpoint is responsible for a specific action or resource in the application.

### Workflow:

#### Request Handling:

- A client sends an HTTP request to the backend server.
- The request is routed to the appropriate Controller based on the URL and HTTP method.

#### Data Manipulation:

- The Controller processes the request, often interacting with the Model for data operations.
- Data retrieved from the Model is transformed into JSON format.

#### JSON Response:

- Instead of rendering HTML views, the Controller sends JSON data as the HTTP response.
- The JSON response contains the necessary data for the client to process, typically for frontend rendering or further processing.

#### Response to Client:

- The client, which is often a web or mobile application, receives the JSON response and can then use the data for rendering, updating the user interface, or performing other actions.
- This architecture is commonly used in modern web applications where frontend frameworks (like React, Angular, or Vue.js) handle the rendering of user interfaces on the client side. The server's primary role is to provide data via APIs, making it more versatile and adaptable to different client applications.

### Advantages of MVC
- Separation of Concerns: The MVC architecture cleanly separates data (Model), presentation (View), and application logic (Controller), making it easier to modify one component without affecting the others.
- Reusability: Components can often be reused in different parts of the application or even in other projects.
- Testability: Each component can be unit tested independently, enhancing the overall reliability of the application.
- Scalability: Scalability is improved since each component can be scaled separately based on demand.
- Maintainability: The organized structure simplifies maintenance and future development efforts.

## Folder Structure
The folder structure of our project will adhere to the following pattern:
- app/
  - models/
  - controllers/
- middlewares/
- database/
	- migrations/
	- seeds/
	- database_config.js
- routes/
- helpers/
- server.js

### Key components:
- app/models: Data models representing the structure of your application's data.
- app/controllers: Handlers for HTTP requests, managing data flow within the app.
- middlewares: Intermediate functions processing incoming requests and outgoing responses.
- database/migrations: Scripts managing database schema changes over time.
- database/seeds: Data or scripts for populating the database with initial records.
- database/database_config.js: Configuration for connecting to the database.
- routes: Definitions for API endpoints, routing HTTP requests to controllers.
- helpers: Utility functions or modules for common functionality.
- server.js: Entry point for configuring and launching the Node.js and Express application.

## Technologies Used
The backend of our project utilizes the following technologies:

- Node.js: Node.js provides the runtime environment for our server-side JavaScript code.

- PostgreSQL: PostgreSQL is our chosen relational database management system. It offers robust data storage capabilities, ACID compliance, and support for complex queries.

- Express: Express.js is the web application framework we use to build our RESTful APIs and manage HTTP requests and responses efficiently. It simplifies routing, middleware integration, and application configuration.

- Sequelize: Sequelize is an ORM (Object-Relational Mapping) library for Node.js. It provides an abstraction layer for database interactions, allowing us to work with PostgreSQL in a more intuitive and object-oriented manner.

## Key Design Decisions

- We have chosen to employ Docker and Docker Compose to containerize our application. This decision streamlines development, deployment, and ensures consistent environments across various stages of the software development lifecycle.
- Environment-specific configurations will be stored in a .env file. This practice enhances security and allows us to manage configuration settings easily, especially when transitioning between development and production environments.
- For authentication and authorization, we will utilize JSON Web Tokens (JWT). JWTs offer a stateless and secure way to verify the identity of clients and control access to protected resources.
- We will use Swagger for API documentation. Swagger provides an interactive and user-friendly interface for developers to understand and interact with our API easily. 

## Conclusion

This document provides an overview of the architecture of our backend server and serves as a guide for system development and maintenance.