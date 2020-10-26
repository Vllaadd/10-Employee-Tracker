const inquirer = require('inquirer')
const mysql = require('mysql')
const connection = require('./config/connection')

let listDep;
let listRoles;
let listEmp;

connection.query("SELECT * FROM roles", function(err, res) {
  if (err) throw err;
  listRoles = res.map(role => ({ name: role.title, value: role.id }));
});
connection.query("SELECT * FROM departments", function(err, res) {
  if (err) throw err;
  listDep = res.map(dep => ({ name: dep.name, value: dep.id }));
});

connection.query("SELECT * FROM employees", function(err, res) {
  if (err) throw err;
  listEmp = res.map(emp => ({
    name: `${emp.first_name}${emp.last_name}`,
    value: emp.id
  }));
});



mainFunction();

function mainFunction(){
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add departmnets',
                'View departments',
                // 'Delete departments',
                // 'Add roles',
                // 'View roles',
                // 'Update roles',
                // 'Delete roles',
                // 'Add employees',
                // 'View employees',
                // 'Delete employees'
            ]
        })
        .then(function(res){
            switch(res.action){
                case 'Add departments':
                    addDep();
                    break;
                case 'View departments':
                    viewDep();
                    break;
                // case 'Delete departments':
                //     delDep();
                //     break;
                // case 'Add roles':
                //     addRoles();
                //     break;
                // case 'View roles':
                //     viewRoles();
                //     break;
                // case 'Update roles':
                //     updateRoles();
                //     break;
                // case 'Delete roles':
                //     delRoles();
                //     break;
                // case 'Add employees':
                //     addEmpl();
                //     break;
                // case 'View employees':
                //     viewEmpl();
                //     break;
                // case 'Delete employees':
                //     delEmpl();
                //     break;
            }
        })
}

//functions

//Add Departmnet
function addDep(){
    inquirer    
        .prompt([
            {
            name: 'name',
            type: 'input',
            message: 'Which department would you like to add?'
        }
    ])
        .then(function(res){
            connection.query(
                'INSERT INTO departments SET ?', 
                { name: res.name },
                function(err, res){
                    if(err) throw err;
                }
            )
        })
        .then(function(){
            mainFunction();
        });    
};

//View Department 
    function viewDep(){
      console.log('Department: \n');
            connection.query(
                'SELECT * FROM department', function(err, res){
                    if(err) throw err;
                    console.log(res);
                    mainFunction();
                });
        }
  



//Add Roles 



//View Roles



//Update Roles 



//Delete Roles



//Add Employees



//View Employees



//Delete Employees