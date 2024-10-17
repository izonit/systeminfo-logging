#!/usr/bin/env node

const os = require("os");
const si = require("systeminformation");
const log = console.log;

async function displayInfo() {
  const chalk = (await import('chalk')).default;

  const uptimeInSeconds = os.uptime();
  const uptimeInHours = Math.floor(uptimeInSeconds / 3600);
  const uptimeInMinutes = Math.floor((uptimeInSeconds % 3600) / 60)

  const cpuInfo = await si.cpu();
  const osInfo = await si.osInfo();
  
  const border = "=".repeat(68); // Declare the border

  log(chalk.bold(`\n${border}`));

  log(chalk.yellow("System Information"));
  log(chalk.green(` CPU: `), `${cpuInfo.manufacturer} ${cpuInfo.brand} ${chalk.bold(os.arch())} / ${os.cpus().length} cores / ${cpuInfo.speed} GHz`); 
  log(chalk.green(` Node Version: `), `${process.version}`);
  log(chalk.green(` Total Memory: `), `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`);
  log(chalk.green(` Free Memory: `), `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`);
  log(chalk.green(` Operating System: `), `${osInfo.distro} / ${chalk.bold(osInfo.release)}`);
  log(chalk.green(` System Uptime: `), `${uptimeInHours} hour(s) ${uptimeInMinutes} minute(s)`);

  console.timeEnd(` Execution Time`);

  log(chalk.bold(`${border}`));
}

console.time(" Execution Time");
displayInfo().catch((err) => {
  console.error(err);
  process.exit(1);
});