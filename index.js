#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const resume = require("./resume.json");
// add response color
const response = chalk.bold.yellow;

const options = {
  type: "list",
  name: "resumeOptions",
  message: "你想知道什麼?",
  choices: [...Object.keys(resume), "👋 掰掰"]
};

function showResume() {
  console.log("Hi! 這是 Steven Ho (何俊億) 的簡歷 🤗");
  handleResume();
}

function handleResume() {
  inquirer.prompt(options).then(answer => {
    if (answer.resumeOptions == "👋 掰掰") {
      console.log(response("謝謝您抽空觀看!"));
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
        message: "回到上一頁 ?",
        choices: ["上一頁", "離開"]
      })
      .then(choice => {
        if (choice.exitBack == "上一頁") {
          handleResume();
        } else {
          console.log(response("謝謝您抽空觀看!"));
          return;
        }
      });
  }).catch(err => console.log('Oops 糟糕,', err))
}

showResume();
