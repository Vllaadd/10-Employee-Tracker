//== DEPENDECIES ======
const inquirer = require('inquirer')
const mysql = require('mysql');
const { title } = require('process');
const connection = require('./config/connection');
require('console.table');

//== LISTS CREATED (declared) ======
let listDep;
let listRoles;
let listEmp;

connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    listDep = res.map(dep => (
        { 
            name: dep.department_name, 
            value: dep.id 
        }
    )); 
});

connection.query("SELECT * FROM roles", function (err, res) { 
    if (err) throw err;
    listRoles = res.map(role => (
        { 
            name: role.title, 
            value: role.id 
        }
    )); 
});

connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    listEmp = res.map(employee => (
        {
            name: `${employee.firstName} ${employee.lastName}`,
            value: employee.id
        }
    ));
});


//== CALLING THE MAIN FUNCTION ======
    mainFunction(); 

//== MAIN FUNCTION WITH QUESTIONS AND CHOICES ======
function mainFunction() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add departments',
                'View departments',
                'Delete departments',
                'Add roles',
                'View roles',
                'Update roles',
                'Delete roles',
                'Add employees',
                'View employees',
                'Delete employees'
            ]
        })
        .then(function (res) {
            switch (res.action) {
                case 'Add departments':
                    addDep();
                    break;
                case 'View departments':
                    viewDep();
                    break;
                case 'Delete departments':
                    delDep();
                    break;
                case 'Add roles':
                    addRoles();
                    break;
                case 'View roles':
                    viewRoles();
                    break;
                case 'Update roles':
                    updateRoles();
                    break;
                case 'Delete roles':
                    delRoles();
                    break;
                case 'Add employees':
                    addEmpl();
                    break;
                case 'View employees':
                    viewEmpl();
                    break;
                case 'Delete employees':
                    delEmpl();
                    break;
            }
        })
}

//== ADD DEPARTMENT ======
function addDep() {
    inquirer
        .prompt({
            name: 'department_name',
            type: 'input',
            message: 'Which department would you like to add?'
        })
        .then(function (answer) {
            connection.query(
                'INSERT INTO departments SET ?',  answer,
                function (err, res) {
                    if (err) throw err;
                    console.log('-----Department added!------');
                    mainFunction();
                }
            )
        })   
};

//== VIEW DEPARTMENT ======
function viewDep() {
    console.log('Department: \n');
    connection.query(
        'SELECT DISTINCT department_name FROM departments', function(err, res){
            if (err) throw err;
            console.table(res);
            mainFunction();
        });
}

//== DELETE DEPARTMENTS ======
    function delDep(){
        inquirer
        .prompt(
            {
                name: 'department_name',
                type: 'input',
                message: 'Which department would you like to delete?'
            }
        )
        .then(function(answer){
            connection.query(
                'DELETE FROM departments WHERE department_name = ?', answer.department_name,
                function(err, res){
                    if(err) throw err;
                    console.log('department successfully deleted');
                    mainFunction();
                }
            )
        })
    }

//== ADD ROLES ======
    function addRoles(){
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Which role would you like to add?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the new role?'
                },
                {
                    name: 'departmentsRole',
                    type: 'list',
                    message: 'Which department the new role belongs to?',
                    choices: listDep
                }
            ])
            .then(function(answer){
                connection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        departmentsID: answer.departmentsRole
                    },
                    function(err){
                        if(err) throw err;
                        console.log('Your role was created successfully!');
                        mainFunction()
                    }
                )
            })
       
    }

//== VIEW ROLES =======
    function viewRoles(){
        console.log('Roles: \n');
        connection.query(
            'SELECT DISTINCT title FROM roles', function(err, res){
                if(err) throw err;
                console.table(res);
                mainFunction();
            }
        )
    }



//== UPDATE ROLES ======
function updateRoles(){
    inquirer 
        .prompt([
            {
                name: 'employee',
                type:'list',
                message: "Which employee's role would you like to update?",
                choices: listEmp
            },{
                name: 'role',
                type: 'list',
                message: 'What is the employee new role?',
                choices: listRoles
            }

        ])
            .then(function(answer){
            connection.query(
                `UPDATE employees SET rolesID = ${answer.role} WHERE id =${answer.employee}`,
                function(err, res){
                    if(err) throw err;
                    console.log(`The update has been successfully update!`);
                    mainFunction();
                }
               
            )
        })
}

//== DELETE ROLES ======
function delRoles(){
    inquirer
    .prompt(
        {
            name: 'del_roles',
            type: 'input',
            message: 'Which role would you like to delete?'
        }
    )
    .then(function(answer){
        connection.query(
            'DELETE FROM roles WHERE ?',
            {title: answer.title},
            function(err, res){
                if(err) throw err;
                console.log(answer.title + 'department successfully deleted');
                mainFunction();
            }
        )
    })
}



//== ADD EMPLOYEES ======
function addEmpl(){
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the employee`s first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employee`s last name?'
            }, 
            {
                name: 'rolesID',
                type: 'list',
                message: 'What is the new employee`s role?',
                choices: listRoles
            }
        ]).then(function(answer){
            connection.query(
                'INSERT INTO  employees SET ?',
                {
                    firstName: answer.firstName,
                    lastName: answer.lastName,
                    rolesID : answer.rolesID
                },
                function(err, res){
                    if(err) throw err;
                    console.log( answer + 'successfully added!')
                    mainFunction()
                }
            )
        })
}


// == VIEW EMPLOYEES ======
 function viewEmpl(){
     connection.query(
         'SELECT DISTINCT firstName, lastName FROM employees', function(err, res){
         if(err) throw err;
         console.table(res);
         mainFunction();
     })
 }


//== DELETE EMPLOYEES ======
function delEmpl(){
    inquirer
    .prompt(
        {
            name: 'delete_dep',
            type: 'input',
            message: 'Which department would you like to delete?'
        }
    )
    .then(function(answer){
        connection.query(
            'DELETE FROM departments WHERE ?',
            {department_name: answer.department_name},
            function(err, res){
                if(err) throw err;
                console.log(answer.department_name + 'department successfully deleted')
            }
        )
    })
}