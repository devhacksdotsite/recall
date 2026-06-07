import { loadConfig } from "./config";
import { runCLI } from "./interfaces/cli";

function printBanner() {
  console.log(`
    ========================
    Recall System Booting
    ========================
  `);
}

function printStatus(config: ReturnType<typeof loadConfig>) {
  console.log("Environment:", config.env);
  console.log("Memory Path:", config.memoryPath);
  console.log("Neo4j:", config.neo4j.uri, "(not connected yet)");
  console.log("Status: READY");
  console.log("========================\n");
}

function main() {
  printBanner();

  const config = loadConfig();
  printStatus(config);

  runCLI();
}

main();
