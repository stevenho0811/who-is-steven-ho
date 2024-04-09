#!/usr/bin/env node
"use strict";

// const inquirer = require("inquirer");
// const chalk = require("chalk");
// const resume = require("./resume.json");
import chalk from 'chalk';
import inquirer from 'inquirer';
import resume from './resume.json' with { type: "json" };
// add response color
const response = chalk.bold.blue;

const options = {
  type: "list",
  name: "resumeOptions",
  message: "您想知道什麼?",
  choices: [...Object.keys(resume), "離開 👋"]
};

function showResume() {
  console.log(`
                        SSS
                   SSS       SSS
               SSS               SSS
               S SSS           SSS
               S     SSS   SSS
               S         SSSS
               S         S    SSS
               SS        S        SS
                  SSS    S    SSS  S
                      SSSSSSS      S
                     SSS   SSS     S
                 SSS           SSS S
               SSS               SSS
                   SSS       SSS
                        SSS`);
  console.log("Hi! 這是 Steven Ho (何俊億) 的簡歷 🤗 \n");
  handleResume();
}

function handleResume() {
  inquirer.prompt(options).then(answer => {
    if (answer.resumeOptions == "離開 👋") {
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
