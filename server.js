const inquirer = require('inquirer');
const mysql = require('mysql');


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
    return inquirer.prompt([
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
    ])
        .then((answer) => {
            switch (answer.menuitem) {
                case "View all employees":
                    viewAllEmp();
                    break;
                case "View all employees by role":
                    viewAllByRole();
                    break;
                case "View all employees by department":
                    viewAllByDept();
                    break;
                case "View all employees by manager":
                    viewAllByMan();
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

// function that allows user to view all employees
const viewAllEmp = () => {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log("\n")
        console.table(res);
        return mainMenu();
    })
}

// function that allows user to view employees by role
const viewAllByRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log("\n")
        console.table(res);
        mainMenu();
    })
}

// function that allows user to view employees by department
const viewAllByDept = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log("\n")
        console.table(res);
        mainMenu();
    })
}

// function that allows user to view all employees who are a manager
const viewAllByMan = () => {
    connection.query("SELECT * FROM employee WHERE manager_id IS NOT NULL", function (err, res) {
        if (err) throw err;
        console.log("\n")
        console.table(res);
        mainMenu();
    })
}

// function that allows user to add an employee
const addEmp = () => {
    inquirer.prompt([
        {
            name: "firstName",
            message: "What is the employee's first name?",
            type: "input"
        },
        {
            name: "lastName",
            message: "What is the employee's last name?",
            type: "input"
        }
    ])
        .then(res => {
            let firstName = res.firstName;
            let lastName = res.lastName;
            connection.query("Select * FROM role", async (err, res) => {
                if (err) throw err;
                // console.log(res);
                const roleChoices = res.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                const roleObj = await inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Which role would you like to give the employee?",
                        choices: roleChoices
                    }
                ])
                connection.query("INSERT INTO employee SET ?", {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleObj.role
                }, function (err, res) {
                    if (err) throw err;
                    console.log("Employee Added");
                    mainMenu();
                });
            });
        });
}

// function that allows user to add a role
const addEmpRole = () => {
    inquirer.prompt([
        {
            name: "roleName",
            message: "What role would you like to add?",
            type: "input"
        },
        {
            name: "roleSalary",
            message: "What is the salary of this new role?",
            type: "number"
        }
    ]).then(res => {
        let roleName = res.roleName;
        let roleSalary = res.roleSalary;
        connection.query("SELECT * FROM department", async (err, res) => {
            if (err) throw err;
            const deptChoices = res.map(({ id, name }) => ({
                name: name,
                value: id
            }))
            const deptObj = await inquirer.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department would you like to add this role to?",
                    choices: deptChoices
                }
            ])
            console.log(deptObj);
            connection.query("INSERT INTO role SET ?", {
                title: roleName,
                salary: roleSalary,
                department_id: deptObj.department
            }, function (err, res) {
                if (err) throw err;
                console.log("Role Added");
                mainMenu();
            })
        })
    })
}

// function that allows user to add a department
const addEmpDept = () => {
    inquirer.prompt([
        {
            name: "deptName",
            message: "What department would you like to add?",
            type: "input"
        }
    ]).then(res => {
        let deptName = res.deptName;
        connection.query("INSERT INTO department SET ?", {
            name: deptName
        }, function (err, res) {
            if (err) throw err;
            console.log("Department Added");
            mainMenu();
        })
    })
}

// function that allows the user to update an employee's role
const updateEmpRole = () => {
    connection.query("SELECT * FROM employee", async (err, res) => {
        if (err) throw err;
        const empChoices = res.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))
        const empObj = await inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role would you like to update?",
                choices: empChoices
            }
        ])
        connection.query("Select * FROM role", async (err, res) => {
            if (err) throw err;
            const roleChoices = res.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            const roleObj = await inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Which role would you like to give the employee?",
                    choices: roleChoices
                }
            ])
            connection.query("UPDATE employee SET role_id = " + roleObj.role + " WHERE id = " + empObj.employee + "",
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Role Updated");
                    mainMenu();
                });
        })
    })
}

// function that allows user to update employee's department
const updateEmpMan = () => {
    connection.query("SELECT * FROM employee", async (err, res) => {
        if (err) throw err;
        const empChoices = res.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))
        const empObj = await inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's manager would you like to update?",
                choices: empChoices
            }
        ])
        connection.query("Select * FROM employee WHERE manager_id IS NOT NULL", async (err, res) => {
            if (err) throw err;
            const manChoices = res.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id
            }))
            const manObj = await inquirer.prompt([
                {
                    type: "list",
                    name: "manager",
                    message: "Which manager would you like to assign to the chosen employee?",
                    choices: manChoices
                }
            ])
            connection.query("UPDATE employee SET manager_id = " + manObj.manager + " WHERE id = " + empObj.employee + "",
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee's Manager Updated");
                    mainMenu();
                });
        })
    })
}









connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
});
