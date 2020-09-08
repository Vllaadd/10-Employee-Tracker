const inquirer = require('inquirer')
const mysql = require('mysql')


function mainFunction(){
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add departmnets',
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
        .then(function(answer){
            switch(userAnswer){
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

//functions

//Add Departmnet
function addDep(input){
    inquirer    
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What department would you like to add?'
        })
        .then(function(){
            console.log('You`ve added a new departmnet!')
        })
}

//View Department 


//Delete Department 



//Add Roles 



//View Roles



//Update Roles 



//Delete Roles



//Add Employees



//View Employees



//Delete Employees