export type RecallConfig = {
  env: string;
  memoryPath: string;
  neo4j: {
    uri: string;
    user: string;
    password: string;
  };
};

export function loadConfig(): RecallConfig {
  return {
    env: process.env.NODE_ENV ?? "development",
    memoryPath: process.env.MEMORY_PATH ?? ".memory",
    neo4j: {
      uri: process.env.NEO4J_URI ?? "bolt://localhost:7687",
      user: process.env.NEO4J_USER ?? "neo4j",
      password: process.env.NEO4J_PASSWORD ?? "password"
    }
  };
}
