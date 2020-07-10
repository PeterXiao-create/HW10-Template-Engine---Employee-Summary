const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = [];
const idArray = [];

function ApplicationMenu() {
    function createManager() {
        console.log("Please create a team!");
        inquirer.prompt([{
                type: "input",
                name: "managerName",
                message: "what is your manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "what is your manager's Id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "what is your manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "what is your manager's office number?"
            }

        ]).then(function(answers) {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMember.push(manager);
            idArray.push(answers.managerId);

            makeTeam()
        })
    }


    function makeTeam() {
        inquirer.prompt([{
                type: "list",
                name: "memberChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "no one"
                ]
            },

        ]).then(function(userChoice) {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();

            }
        })

    }

    function addEngineer() {
        inquirer.prompt([{
                type: "input",
                name: "engineerName",
                message: "what is your engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "what is your engineer's Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is your engineer's email?"
            },
            {
                type: "input",
                name: "github",
                message: "what is your Github username?"
            }

        ]).then(function(answers) {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
            teamMember.push(engineer);
            idArray.push(answers.engineerId);

            makeTeam()
        })
    }

    function addIntern() {
        inquirer.prompt([{
                type: "input",
                name: "inernrName",
                message: "what is your intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "what is your intern Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "what is your intern email?"
            },
            {
                type: "input",
                name: "internschool",
                message: "what is your intern's school?"
            }

        ]).then(function(answers) {
            const intern = new Intern(answers.inernrName, answers.internId, answers.internEmail, answers.internschool);
            teamMember.push(intern);
            idArray.push(answers.internId);
            makeTeam()
        })
    }

    function buildTeam() {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMember), "utf-8");
    }

    createManager();
}

ApplicationMenu();