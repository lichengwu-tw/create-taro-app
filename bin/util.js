#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const ora = require("ora");
const spinner = ora();

/**
 *  download Template
 */

function downloadTemplate(params) {
  const { repoUrl, dir } = params;
  spinner.start("loading");
  let isHasDir = fs.existsSync(path.resolve(dir));
  if (isHasDir) {
    spinner.fail("current dir is already existed!");
    return false;
  }
  // start to download template file
  // https://shadownc.github.io/2018/06/14/nodejs%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E8%84%9A%E6%89%8B%E6%9E%B6%E9%81%87%E5%88%B0%E5%BE%97%E5%9D%91/
  download(repoUrl, dir, { clone: true }, function (err) {
    if (err) {
      console.log(err);
      spinner.fail(err);
      return false;
    }
    spinner.succeed("下载完毕");
    console.log("\x1b[31m", "Project download finished");
    console.log("\x1b[32m", "=====================");
    console.log();
    console.log("To get started");
    console.log();
    console.log("\x1b[31m", `    cd ${dir}`);
    console.log();
    console.log("\x1b[31m", `    yarn && npm install`);
    console.log();
    console.log("\x1b[31m", "    yarn && npm run start");
  });
}

function updateTemplateFile() {}

exports.downloadTemplate = downloadTemplate;