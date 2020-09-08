const inquirer = require('inquirer')
const mysql = require('mysql')
const chalk = require('chalk');
const { allowedNodeEnvironmentFlags } = require('process');


function mainFunction(){
    inquirer
        .prompt({
            name: 'track',
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
                    addDepartments();
                    break;
                case 'View departments':
                    viewDepartments();
                    break;
                case 'Delete departments':
                    delDepartments();
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