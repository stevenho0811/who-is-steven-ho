#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const resume = require("./resume.json");
// add response color
const response = chalk.bold.blue;

const options = {
  type: "list",
  name: "resumeOptions",
  message: "您想知道什麼?",
  choices: [...Object.keys(resume), "👋 掰掰"]
};

function showResume() {
  console.log("Hi! 這是 Steven Ho (何俊億) 的簡歷 🤗");
  handleResume();
}

function handleResume() {
  inquirer.prompt(options).then(answer => {
    if (answer.resumeOptions == "👋 掰掰") {
      console.log(response("謝謝您撥空閱覽!"));
      return;
    }
    const option = resume[`${answer.resumeOptions}`]

    if (option) {
      console.log(response(new inquirer.Separator()));
      option.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "返回上一頁?",
        choices: ["返回", "離開"]
      })
      .then(choice => {
        if (choice.exitBack == "返回") {
          handleResume();
        } else {
          console.log(response("謝謝您撥空閱覽!"));
          return;
        }
      });
  }).catch(err => console.log('Oops 有東西壞掉了,', err))
}

showResume();
