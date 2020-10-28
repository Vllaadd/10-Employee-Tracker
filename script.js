//=========== DENEPNDECIES =====================
const inquirer = require('inquirer')
const mysql = require('mysql');
const { title } = require('process');
const connection = require('./config/connection')

let listDep;
let listRoles;
let listEmp;

connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    listDep = res.map(dep => ({ name: dep.name, value: dep.id })); //we use map method to add id to each department, role and employee.
});

connection.query("SELECT * FROM roles", function (err, res) { // choose the data from the table.
    if (err) throw err;
    listRoles = res.map(role => ({ name: role.title, value: role.id })); // we choose what the callback function to do with the data. 
});

connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    listEmp = res.map(emp => ({
        name: `${emp.first_name}${emp.last_name}`,
        value: emp.id
    }));
});


//========= CALLING THE MAIN FUNCTION ====================
    mainFunction(); 

// =========== MAIN FUNCTION WITH QUESTIONS AND CHOICES ==============
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

//========= ADD DEPARTMENT =====================
function addDep() {
    inquirer
        .prompt({
            name: 'new_dep',
            type: 'input',
            message: 'Which department would you like to add?'
        })
        .then(function (answer) {
            connection.query(
                'INSERT INTO departments SET ?',
                { department_name: answer.department_name },
                function (err, res) {
                    if (err) throw err;
                    console.log('-----Department added!------');
                    mainFunction();
                }
            )
        })   
};

//=========== VIEW DEPARTMENT =====================
function viewDep() {
    console.log('Department: \n');
    connection.query(
        'SELECT DISTINCT department_name FROM departments', function(err, res){
            if (err) throw err;
            console.log(res);
            mainFunction();
        });
}

//=========== DELETE DEPARTMENTS =================
    function delDep(){
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

//============ ADD ROLES ======================
    function addRoles(){
        inquirer
            .prompt({
                    name: 'new_role',
                    type: 'input',
                    message: 'Which role would you like to add?'
            })
            .then(function(answer){
                connection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        departmentsID: answer.departmentsID
                    },
                    function(err){
                        if(err) throw err;
                        console.log('Your role was created successfully!');
                        mainFunction()
                    }
                )
            })
       
    }

//============= VIEW ROLES ====================
    function viewRoles(){
        console.log('Roles: \n');
        connection.query(
            'SELECT DISTINCT title FROM roles', function(err, res){
                if(err) throw err;
                console.log(res);
                mainFunction();
            }
        )
    }



//===========UPDATE ROLES =====================
function updateRoles(){
    inquirer 
        .prompt(
            {
                name: 'update_role',
                type:'input',
                message: 'Which role would you like to update?'
            }
            ).then(function(answer){
            connection.query(
                `SELECT title FROM roles WHERE salary = ${roles.salary}`,
                 `UPDATE roles SET salary = ${answer.salary}  WHERE salary = ${roles.salary}`,
                function(err, res){
                    if(err) throw err;
                    console.log(`${answer.role} has been successfully update!`);
                    mainFunction();
                }
               
            )
        })
}

SELECT 
    firstname, 
    lastname, 
    email
FROM
    employees
WHERE
    employeeNumber = 1056;

//========== DELETE ROLES =======================
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



//============= ADD EMPLOYEES =====================
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
                type: 'input',
                message: 'What is the employee`s role?'
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
                    mainFunction()
                }
            )
        })
}


// ============ VIEW EMPLOYEES ===================
 function viewEmpl(){
     connection.query(
         'SELECT DISTINCT firstName, lastName FROM employees', function(err, res){
         if(err) throw err;
         console.log(res);
         mainFunction();
     })
 }


//============== DELETE EMPLOYEES =================
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