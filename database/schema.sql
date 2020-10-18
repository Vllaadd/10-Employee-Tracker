CREATE DATABASE employeeDB
USE employeeDB;

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8, 2)
);