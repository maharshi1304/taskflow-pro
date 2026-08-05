import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

/*
  ES module environment me __dirname directly
  available nahi hota, isliye manually create karte hain.
*/
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/*
  Runtime database location.

  Local:
  api-server/data/db.json

  Render persistent disk:
  /app/data/db.json
*/
const dataDirectory = path.join(
  currentDirectory,
  "data"
);

const databasePath = path.join(
  dataDirectory,
  "db.json"
);

const seedDatabasePath = path.join(
  currentDirectory,
  "seed-db.json"
);

/*
  Render dynamically PORT provide karta hai.
  Local development me default 5001 use hoga.
*/
const port = process.env.PORT || "5001";

/*
  JSON Server v1 ./public directory scan karta hai.
  Missing folder ke karan container crash na ho,
  isliye startup par ensure karte hain.
*/
const publicDirectory = path.join(
  currentDirectory,
  "public"
);

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, {
    recursive: true,
  });
}

/*
  Data directory ensure karo.
*/
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, {
    recursive: true,
  });
}

/*
  Agar db.json missing hai, seed file se initialize karo.
  Ye empty Render disk ya fresh Docker volume ke liye useful hai.
*/
if (!fs.existsSync(databasePath)) {
  if (fs.existsSync(seedDatabasePath)) {
    fs.copyFileSync(
      seedDatabasePath,
      databasePath
    );

    console.log(
      "Database initialized from seed-db.json"
    );
  } else {
    fs.writeFileSync(
      databasePath,
      JSON.stringify(
        {
          tasks: [],
        },
        null,
        2
      )
    );

    console.log(
      "Empty database created."
    );
  }
}

console.log(
  `Starting TaskFlow JSON API on port ${port}`
);

console.log(
  `Database location: ${databasePath}`
);

/*
  JSON Server v1 ko supported CLI interface
  ke through start karte hain.
*/
const jsonServerProcess = spawn(
  "json-server",
  [
    databasePath,
    "--host",
    "0.0.0.0",
    "--port",
    port,
  ],
  {
    cwd: currentDirectory,
    stdio: "inherit",
    shell: true,
  }
);

jsonServerProcess.on(
  "error",
  (error) => {
    console.error(
      "Unable to start JSON Server:",
      error
    );

    process.exit(1);
  }
);

jsonServerProcess.on(
  "close",
  (exitCode) => {
    console.log(
      `JSON Server stopped with exit code ${exitCode}`
    );

    process.exit(exitCode ?? 1);
  }
);

/*
  Render restart, Docker stop ya Ctrl+C ke time
  child JSON Server process ko cleanly stop karta hai.
*/
function stopServer(signal) {
  console.log(
    `Received ${signal}. Stopping JSON Server...`
  );

  jsonServerProcess.kill(signal);
}

process.on("SIGTERM", () => {
  stopServer("SIGTERM");
});

process.on("SIGINT", () => {
  stopServer("SIGINT");
});
