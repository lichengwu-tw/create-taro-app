"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProjectName = setProjectName;
exports.mode = mode;
exports.type = type;
exports.compareVersion = compareVersion;
exports.renderView = renderView;

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const inquirer = require("inquirer");

/**
 * if hasn't projectName ,set one
 */
async function setProjectName(dir) {
  const { projectName } = await inquirer.prompt({
    name: "projectName",
    message: "input project name"
  });
  global["projectName"] = projectName;
  if (!projectName) {
    console.log("\n please input dir".green + "\n");
    await setProjectName();
  } else if (fs.existsSync(projectName)) {
    console.log("\n the dir has exists, please input another one".green + "\n");
    await setProjectName();
  } else {
    return projectName;
  }
}

/**
 * select mode
 */
async function mode() {
  return await inquirer.prompt({
    name: "flag",
    message: "select a mode",
    type: "list",
    choices: [{
      name: "taro + redux-saga + typescript",
      value: "taro-redux-typescript"
    }]
  });
}

/**
 * file directory
 * @param mode
 */
function type(mode) {
  return {
    "taro-redux-typescript": "../template/taro-redux-typescript"
  }[mode];
}

/**
 * node version need > 8
 * @param version
 */
function compareVersion(version) {
  return Number(version.split(".")[0]) >= 8;
}

/**
 * render view
 * @param filename
 * @param viewsPath
 */
function renderView(filename, viewsPath) {
  const name = filename.slice(0, 1).toUpperCase() + filename.slice(1);
  fs.writeFileSync(`${viewsPath}/${filename}.jsx`, `import React from 'react'
export default class ${name} extends React.PureComponent {
  render() {
    return ${name}
  }
}
  `);
  console.log(`${filename}.jsx has been rendered at ${viewsPath}`.green);
}