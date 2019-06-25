#!/usr/bin/env node
import * as ncp from 'ncp';
import * as ora from 'ora';
import * as fs from 'fs';
const inquirer = require("inquirer");
/**
 * generation directory
 * @param dir directory
 * @param projectName project name
 */
export function dir(dir, projectName) {
  const spinner = ora('init project');
  spinner.start();
  ncp.ncp(dir, projectName, (err) => {
    if (err) {
      console.log(err); process.exit();
    }
    spinner.stop();
    console.log();
    console.log("Project init finished".green);
    console.log("=====================".green);
    console.log();
    console.log("To get started");
    console.log();
    console.log(`    cd ${projectName}`.red);
    console.log("    yarn && npm run start".red);
  })
}