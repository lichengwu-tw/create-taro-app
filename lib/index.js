#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = undefined;

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _util = require("./util");

var _generate = require("./generate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const version = require("../package.json").version;


_commander2.default.version(version, "-V, --version").usage("[Options] | [Commands] <file>");

_commander2.default.command("init").description("generation a taro project").option("dir");

_commander2.default.on("--help", function () {
  console.log("\n Examples:");
  console.log("");
  console.log("  $ create-taro-app -h");
  console.log("  $ create-taro-app init taro-demo ");
  console.log("");
});

function help() {
  _commander2.default.parse(process.argv);
  if (_commander2.default.args.length < 1) return _commander2.default.help();
}
help();

const release = exports.release = async () => {
  const nodeVersion = (0, _child_process.execSync)("node -v", { encoding: "utf8" });
  if (process.argv.length === 2) {
    (0, _child_process.execSync)("create-taro-app -h");
  }
  if (!(0, _util.compareVersion)(nodeVersion)) {
    console.log("Please make sure the node version is above 8.0".red);
    process.exit();
  }
  const argv2 = process.argv[2];
  const argv3 = process.argv[3];
  if (argv2 === "init") {
    let projectName = argv3;
    if (!projectName) {
      projectName = await (0, _util.setProjectName)();
    } else if (_fs2.default.existsSync(projectName)) {
      console.log("\n the dir has exists, please input another one".green + "\n");
      projectName = await (0, _util.setProjectName)();
    }

    const reactMode = await (0, _util.mode)();
    projectName = projectName || global["projectName"];
    _fs2.default.mkdirSync(projectName);
    const currentPath = _path2.default.resolve(__dirname, "..");
    const directory = currentPath + (0, _util.type)(reactMode.flag);
    (0, _generate.dir)(directory, projectName);
  }
};
release().catch(err => {
  console.error(err);
  process.exit();
});

_commander2.default.parse(process.argv);