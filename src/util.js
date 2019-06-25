import * as fs from "fs";
import * as path from "path";
const inquirer = require("inquirer");

/**
 * if hasn't projectName ,set one
 */
export async function setProjectName(dir) {
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

// export async function setFileName(dir) {
//   const viewsPath = path.resolve(__dirname, "../src/views/");
//   let { filename } = await inquirer.prompt({
//     name: "filename",
//     message: "input file name"
//   });
//   filename = filename.split(".")[0];
//   global["filename"] = filename;
//   if (!filename) {
//     console.log("\n please input dir".green + "\n");
//     await setFileName();
//   } else if (fs.existsSync(`${viewsPath}/${filename}.js`)) {
//     console.log("\n the dir has exists, please input another one".green + "\n");
//     await setFileName();
//   } else {
//     return filename;
//   }
// }

/**
 * select mode
 */
export async function mode() {
  return await inquirer.prompt({
    name: "flag",
    message: "select a mode",
    type: "list",
    choices: [
      {
        name: "taro + redux-saga + typescript",
        value: "taro-redux-typescript"
      }
    ]
  });
}

/**
 * file directory
 * @param mode
 */
export function type(mode) {
  return {
    "taro-redux-typescript": "/src/template/taro-redux-typescript",
  }[mode];
}

/**
 * node version need > 8
 * @param version
 */
export function compareVersion(version) {
  return Number(version.split(".")[0]) >= 8;
}

/**
 * render view
 * @param filename
 * @param viewsPath
 */
export function renderView(filename, viewsPath) {
  const name = filename.slice(0, 1).toUpperCase() + filename.slice(1);
  fs.writeFileSync(
    `${viewsPath}/${filename}.jsx`,
    `import React from 'react'
export default class ${name} extends React.PureComponent {
  render() {
    return ${name}
  }
}
  `
  );
  console.log(`${filename}.jsx has been rendered at ${viewsPath}`.green);
}