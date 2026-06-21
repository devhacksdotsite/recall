import { MemoryStore } from "../../infrastructure/memory/MemoryStore.js";

export class SaveService {
  constructor(
    private readonly memoryStore: MemoryStore
  ) {}

  async save(
    input: string
  ): Promise<void> {
    this.memoryStore.append(
      "project-summary.md",
      `\n${input}\n`
    );

    console.log(
      "Memory saved successfully"
    );
  }
}
