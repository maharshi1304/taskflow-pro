import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

/*
  ES Modules me __dirname directly available nahi hota,
  isliye current file path se create kar rahe hain.
*/
const currentFilePath = fileURLToPath(
  import.meta.url
);

const currentDirectory = path.dirname(
  currentFilePath
);

/*
  Railway persistent volume ko /app/data
  par mount kiya jayega.

  Local environment me:
  api-server/data/db.json
*/
const dataDirectory = path.join(
  currentDirectory,
  "data"
);

const databasePath = path.join(
  dataDirectory,
  "db.json"
);

/*
  Repository me initial data ko alag seed file
  me preserve rakhenge.

  Railway ka empty volume mount hone par
  isi file se db.json initialize hogi.
*/
const seedDatabasePath = path.join(
  currentDirectory,
  "seed-db.json"
);

const port = process.env.PORT || "5001";

/*
  Data directory create karo agar missing ho.
*/
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, {
    recursive: true,
  });
}

/*
  Persistent volume me db.json missing ho,
  to seed database copy karo.

  Agar seed file bhi missing ho,
  to empty tasks database create karo.
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
  JSON Server ko CLI command ke through run karte hain.

  Package ko JavaScript module ki tarah import nahi
  kar rahe, isliye v1 package-entry error nahi aayega.
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
    stdio: "inherit",
    shell: true,
  }
);

/*
  Child process start na ho paye to useful error.
*/
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

/*
  JSON Server process close ho to parent process
  bhi same exit code ke saath close hoga.
*/
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
  Railway ya local terminal se shutdown signal
  milne par child process ko properly stop karo.
*/
function stopServer(signal) {
  console.log(
    `Received ${signal}. Stopping JSON Server...`
  );

  jsonServerProcess.kill(signal);
}

process.on("SIGTERM", () =>
  stopServer("SIGTERM")
);

process.on("SIGINT", () =>
  stopServer("SIGINT")
);