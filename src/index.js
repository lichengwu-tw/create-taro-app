#!/usr/bin/env node
const commander = require("commander");
const inquirer = require("inquirer");
const { downloadTemplate } = require("./util");
const templates = require("./templates");

commander.parse(process.argv);

let dir = commander.args[0];

const questions = [
  {
    type: "input",
    name: "name",
    message: "项目名称",
    default: "默认: taro-demo",
    validate: name => {
      if (/^[a-z]+/.test(name)) {
        return true;
      } else {
        return "项目名称必须以小写字母开头";
      }
    }
  },
  {
    type: "input",
    name: "package",
    message: "package name",
    validate: name => {
      if (/^[a-z]+/.test(name)) {
        return true;
      } else {
        return "package名称必须以小写字母开头";
      }
    }
  },
  {
    type: "input",
    name: "version",
    message: "version",
    default: "1.0.0",
    validate: name => {
      if (/^[0-9]\.[0-9]\.[0-9]/.test(name)) {
        return true;
      } else {
        return "版本号格式必须是x.y.z 请参考：https://semver.org/lang/zh-CN/";
      }
    }
  },
  {
    name: "value",
    message: "选择一个模版",
    type: "list",
    choices: templates
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(answers);
  const { name, value } = answers;
  downloadTemplate({ repoUrl: value, dir: name });
});
