import { loadConfig } from "./config/index.js";
import { runCLI } from "./interfaces/cli/index.js";
import { Neo4jService } from "./infrastructure/neo4j/Neo4jService.js";
import { MemoryBootstrap } from "./infrastructure/memory/MemoryBootstrap.js";

// Test imports
import { GraphRepository } from "./infrastructure/neo4j/GraphRepository.js";
import { Neo4jClient } from "./infrastructure/neo4j/Neo4jClient.js";
import { MemoryStore } from "./infrastructure/memory/MemoryStore.js";
import { ContextBuilder } from "./application/context/ContextBuilder.js";
// END Test imports

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

async function testGraphRepo() {
  const client = new Neo4jClient();
  const graph = new GraphRepository(client);

  await graph.createNode({
    id: "project-1",
    type: "Project",
    properties: {
      name: "Recall",
      summary: "Persistent AI memory system"
    }
  });

  await graph.createNode({
    id: "feature-1",
    type: "Feature",
    properties: {
      name: "Save Command"
    }
  });

  await graph.createRelationship({
    fromId: "feature-1",
    toId: "project-1",
    type: "BELONGS_TO"
  });

  console.log(
    await graph.findNode("project-1")
  );
}

async function testContextBuilder(config: ReturnType<typeof loadConfig>
) {
  const client = new Neo4jClient();
  const graph = new GraphRepository(client);

  const memoryStore = new MemoryStore(
    config.memoryPath
  );

  const contextBuilder =
    new ContextBuilder(
      memoryStore,
      graph
    );

  const context =
    await contextBuilder.build();

  console.log(context);
}

async function main() {
  printBanner();

  const config = loadConfig();
  printStatus(config);

  MemoryBootstrap.initialize(config.memoryPath);

  const neo4j = new Neo4jService();

  await neo4j.testConnection();

  runCLI();

  // Test context contextBuilder
  testContextBuilder(config);

  await neo4j.shutdown();
}

main();
