CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    departmentsID INT,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    rolesID INT,
    managersID INT,
    PRIMARY KEY(id)
);