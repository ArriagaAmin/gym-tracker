import path from "path";
import { exec } from "child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

const apiDir = path.join(__dirname, "..", "..", "api");

/**
 * Run a database migration via the API
 */
export const migrateDatabase = async () => {
  try {
    const { stdout, stderr } = await execPromise(
      `cd ${apiDir} && venv\\Scripts\\python.exe manage.py migrate`,
    );
    console.log(stdout);
  } catch (error) {
    console.error("Error during migration:", error.message, error.stderr);
  }
};
