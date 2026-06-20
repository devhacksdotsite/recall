import neo4j from "neo4j-driver";
import { loadConfig } from "../../config";

// Transport layer - Low level infrastructure
export class Neo4jClient {
  private driver;

  constructor() {
    const config = loadConfig();

    this.driver = neo4j.driver(
      config.neo4j.uri,
      neo4j.auth.basic(config.neo4j.user, config.neo4j.password)
    );
  }

  public getDriver() {
    return this.driver;
  }

  async verifyConnection(): Promise<boolean> {
  try {
    await this.driver.verifyConnectivity();

    return true;
  } catch (err) {
    console.error(
      "Neo4j connectivity check failed:",
      err
    );

    return false;
  }
}

  async close(): Promise<void> {
    await this.driver.close();
  }
}
