#!/usr/bin/env node
import  commander from "commander";
import  fs from "fs";
import { execSync } from "child_process";
import path from "path";
const version = require("./package.json").version;
import { setProjectName, mode, type, compareVersion } from "./src/util";
import { dir } from "./src/generate";

commander
  .version(version, "-V, --version")
  .usage("[Options] | [Commands] <file>");

commander
  .command("init")
  .description("generation a taro project")
  .option("dir");

commander.on("--help", function() {
  console.log("\n Examples:");
  console.log("");
  console.log("  $ create-taro-app -h");
  console.log("  $ create-taro-app init taro-demo ");
  console.log("");
});

function help() {
  commander.parse(process.argv);
  if (commander.args.length < 1) return commander.help();
}
help();

export const release = async () => {
  const nodeVersion = execSync("node -v", { encoding: "utf8" });
  if (process.argv.length === 2) {
    execSync("create-taro-app -h");
  }
  if (!compareVersion(nodeVersion)) {
    console.log("Please make sure the node version is above 8.0".red);
    process.exit();
  }
  const argv2 = process.argv[2];
  const argv3 = process.argv[3];
  if (argv2 === "init") {
    let projectName = argv3;
    if (!projectName) {
      projectName = await setProjectName();
    } else if (fs.existsSync(projectName)) {
      console.log(
        "\n the dir has exists, please input another one".green + "\n"
      );
      projectName = await setProjectName();
    }

    const reactMode = await mode();
    projectName = projectName || global["projectName"];
    fs.mkdirSync(projectName);
    const currentPath = path.resolve(__dirname, "..");
    const directory = currentPath + type(reactMode.flag);
    dir(directory, projectName);
  }
};
release().catch(err => {
  console.error(err);
  process.exit();
});

commander.parse(process.argv);