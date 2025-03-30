import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { spawn } from "child_process";
import axios from "axios";
import treeKill from "tree-kill";
import { migrateDatabase } from "./migrate";

const isProd = process.env.NODE_ENV === "production";

const apiDir = isProd
  ? path.join(__dirname, "..", "..", "api")
  : path.join(__dirname, "..", "api");

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

/**
 * Send a healthcheck request to the API every certain amount of time until it gets a 
 * positive response, indicating that the API is active.
 * @param retries Maximum number of requests to be sent
 * @param delay Time to wait between each request
 */
const waitForDjangoServer = async (
  retries: number = 30,
  delay: number = 5000,
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get("http://localhost:8000/api/healthcheck");
      if (response.status === 200) {
        console.log("Django Server is available");
        return;
      }
    } catch (error) {
      console.log(
        `Attempt ${i + 1}: Django Server is not available yet. Retrying...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(
    "Django Server did not become available within the expected time.",
  );
};

/**
 * Initialize the API and wait until it is active
 */
const runDjangoServer = async () => {
  const djangoServer = spawn(
    ".\\venv\\Scripts\\python.exe",
    ["manage.py", "runserver"],
    {
      cwd: apiDir,
      shell: true,
    },
  );

  djangoServer.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  djangoServer.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  djangoServer.on("close", (code) => {
    console.log(`Django Server exited with code ${code}`);
  });

  const handleAppExit = () => {
    if (djangoServer) {
      console.log("Stopping Django Server...");
      djangoServer.stdin.end();
      treeKill(djangoServer.pid, "SIGKILL");
    }
    process.exit();
  };

  process.on("exit", handleAppExit);

  await waitForDjangoServer();
};

////////////// Initialize the API and run the application //////////////

(async () => {
  await app.whenReady();

  if (isProd) {
    // Migrate if we are on the production server
    await migrateDatabase();
  }
  // Start the Django server
  await runDjangoServer();

  // Once the Django server is up and running, create the Electron window
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./");
    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
