import { Neo4jClient } from "./Neo4jClient.js";

type GraphNode = {
  id: string;
  type: string;
  properties: Record<string, unknown>;
};

type GraphRelationship = {
  fromId: string;
  toId: string;
  type: string;
};

export class GraphRepository {
  constructor(
    private readonly client: Neo4jClient
  ) {}

  async createNode(
    node: GraphNode
  ): Promise<void> {
    const session =
      this.client.getDriver().session();

    try {
      await session.run(
        `
        MERGE (n:${node.type} {id: $id})
        SET n += $properties
        `,
        {
          id: node.id,
          properties: node.properties
        }
      );
    } finally {
      await session.close();
    }
  }

  async createRelationship(
    relationship: GraphRelationship
  ): Promise<void> {
    const session =
      this.client.getDriver().session();

    try {
      await session.run(
        `
        MATCH (a {id: $fromId})
        MATCH (b {id: $toId})
        MERGE (a)-[r:${relationship.type}]->(b)
        `,
        {
          fromId: relationship.fromId,
          toId: relationship.toId
        }
      );
    } finally {
      await session.close();
    }
  }

  async findNode(
    id: string
  ): Promise<Record<string, unknown> | null> {
    const session =
      this.client.getDriver().session();

    try {
      const result = await session.run(
        `
        MATCH (n {id: $id})
        RETURN n
        `,
        { id }
      );

      if (!result.records.length) {
        return null;
      }

      return result.records[0]
        .get("n")
        .properties;
    } finally {
      await session.close();
    }
  }
}
