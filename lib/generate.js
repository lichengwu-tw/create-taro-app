'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dir = dir;

var _ncp = require('ncp');

var ncp = _interopRequireWildcard(_ncp);

var _ora = require('ora');

var ora = _interopRequireWildcard(_ora);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const inquirer = require("inquirer");
/**
 * generation directory
 * @param dir directory
 * @param projectName project name
 */
function dir(dir, projectName) {
  const spinner = ora('init project');
  spinner.start();
  ncp.ncp(dir, projectName, err => {
    if (err) {
      console.log(err);process.exit();
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
  });
}