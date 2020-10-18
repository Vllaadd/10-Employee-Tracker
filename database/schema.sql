CREATE DATABASE employeesDB
USE employeesDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    departmentID INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleID INT,
    managerID INT,
    PRIMARY KEY(id)
)