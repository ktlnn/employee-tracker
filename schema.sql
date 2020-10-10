-- DROP DATABASE IF EXISTS employeesDB;

-- CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
 id INT AUTO_INCREMENT NOT NULL,
 name VARCHAR(30),
 PRIMARY KEY (id)
);

CREATE TABLE role (
 id INT AUTO_INCREMENT NOT NULL,
 title VARCHAR(30),
salary DECIMAL,
department_id  INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
 id INT AUTO_INCREMENT NOT NULL,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT NOT NULL,
 manager_id INT,
 PRIMARY KEY (id),
 FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
 FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("accountant");
INSERT INTO department (name) VALUES ("developer");

INSERT INTO role (title, salary, department_id) VALUES ("Junior Sales Advisor", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant Manager", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("", ,);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rajida", "Jones", 1, null);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("", "", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("", "", 1);