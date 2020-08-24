const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require("console.table");
const util = require('util');


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "jellyfish123",
    database: "employeesDB"
});


const mainMenu = () => {
    return inquirer.prompt [(
        {
            message: "Main Menu",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Update employee department",
                "Update employee manager",
                "Delete a role",
                "Delete a manager",
                "Delete a department"
            ],
            name: "menuitem",
            type: "list"
        }
    )]
    .then((answer) => {
        switch(answer.menuitem){
            case "View all employees":
                viewAllEmp();
            break;
            case "View all employees by role":
                viewAllEmpRole();
            break;
            case "View all employees by department":
                viewAllEmpDept();
            break;
            case "View all employees by manager":
                viewAllEmpMan();
            break;
            case "Add employee":
                addEmp();
            break;
            case "Add role":
                addEmpRole();
            break;
            case "Add department":
                addEmpDept();
            break;
            case "Update employee role":
                updateEmpRole();
            break;
            case "Update employee manager":
                updateEmpMan();
            break;
            case "Delete a role":
                deleteEmpRole();
            break;
            case "Delete a manager":
                deleteEmpMan();
            break;
            case "Delete a department":
                deleteEmpDept();
            break;
            default:
            connection.end();
        }
    })
}

const viewAllEmp = () => {
    let query = "SELECT * FROM employee";
    connectionQuery(query)
    .then(res => {
        console.log("\n")
        console.table(res);
        return mainMenu();
    })

}

const viewAllDept = () => {
    let deptArr = [];
    connectionQuery("SELECT name ")
}

connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
});
