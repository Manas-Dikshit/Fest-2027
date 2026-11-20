import { spawn, execSync } from "child_process";
import { existsSync } from "fs";

const isWin = process.platform === "win32";

// Install only what is missing, so the command is safe to re-run.
for (const dir of [".", "client"]) {
  if (!existsSync(`${dir}/node_modules`)) {
    console.log(`Installing dependencies in ${dir}...`);
    execSync("npm install", { cwd: dir, stdio: "inherit" });
  }
}

const children = [
  spawn("npm", ["start"], { stdio: "inherit", shell: true }),
  spawn("npm", ["run", "dev"], { cwd: "client", stdio: "inherit", shell: true }),
];

const shutdown = () => {
  for (const child of children) {
    if (isWin) {
      try {
        execSync(`taskkill /pid ${child.pid} /T /F`);
      } catch {}
    } else {
      child.kill();
    }
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
for (const child of children) child.on("exit", shutdown);
