import { loadConfig } from "./config/index.js";
import { runCLI } from "./interfaces/cli/index.js";
import { Neo4jService } from "./infrastructure/neo4j/Neo4jService.js";
import { MemoryBootstrap } from "./infrastructure/memory/MemoryBootstrap.js";

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
  console.log("========================\n");
}

async function main() {
  printBanner();

  const config = loadConfig();
  printStatus(config);

  MemoryBootstrap.initialize(config.memoryPath);

  const neo4j = new Neo4jService();

  await neo4j.testConnection();

  runCLI();

  await neo4j.shutdown();
}

main();
