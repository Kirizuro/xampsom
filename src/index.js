// import { exec } from "child_process";
const exec = require("child_process");

// import { promisify } from "util";
const promisify = require("util");

// import path from "path";
const path = require("path");

// import fs from "fs";
const fs = require("fs");

const execPromise = promisify.promisify(exec.exec);

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, "./audio/xampsom");
const windowsScript = path.join(mainPath, "./forWindows.jscript");

const oloquinho = () => {
  const commandEachOS = {
    linux: `paplay ${soundPath}.mp3`,
    win32: `cscript /E:JScript /nologo "${windowsScript}" "${soundPath}.mp3"`,
    darwin: `afplay ${soundPath}.mp3`,
  };

  const platform = process.platform;
  const execute = commandEachOS[platform];

  return execPromise(execute);
};

module.exports = oloquinho;
