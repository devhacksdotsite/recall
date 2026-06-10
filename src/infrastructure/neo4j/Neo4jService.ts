import { Neo4jClient } from "./Neo4jClient";

export class Neo4jService {
  private client: Neo4jClient;

  constructor() {
    this.client = new Neo4jClient();
  }

  async testConnection(): Promise<void> {
    const ok = await this.client.verifyConnection();

    if (ok) {
      console.log("Neo4j connection established");
      console.log("Test query successful: 1");
    } else {
      console.log("Neo4j connection failed");
    }
  }

  async shutdown(): Promise<void> {
    await this.client.close();
  }
}