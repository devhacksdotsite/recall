import { MemoryStore } from "../../infrastructure/memory/MemoryStore.js";
import { GraphRepository } from "../../infrastructure/neo4j/GraphRepository.js";

export class ContextBuilder {
  constructor(
    private readonly memoryStore: MemoryStore,
    private readonly graphRepository: GraphRepository
  ) {}

  async build(): Promise<string> {
    const summary =
      this.memoryStore.read(
        "/project-summary.md"
      );

    const architecture =
      this.memoryStore.read(
        "/architecture.md"
      );

    const requirements =
      this.memoryStore.read(
        "/requirements.md"
      );

    const decisions =
      this.memoryStore.read(
        "/decisions.md"
      );

    const tasks =
      this.memoryStore.read(
        "/tasks.md"
      );

    const projectNode =
      await this.graphRepository.findNode(
        "project-1"
      );

    return `
      # Recall Context Package

      ${summary}

      ${architecture}

      ${requirements}

      ${decisions}

      ${tasks}

      ## Graph Context

      ${JSON.stringify(projectNode, null, 2)}
    `;
  }
}
