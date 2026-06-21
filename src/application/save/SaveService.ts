import { MemoryStore } from "../../infrastructure/memory/MemoryStore.js";
import { SummaryGenerator } from "./SummaryGenerator.js";

export class SaveService {
  constructor(
    private readonly memoryStore: MemoryStore,
    private readonly summaryGenerator: SummaryGenerator
  ) {}

  async save(input: string): Promise<void> {
    const summary =
      this.summaryGenerator.generate(input);

    this.memoryStore.append(
      "project-summary.md",
      summary
    );

    console.log(
      "Memory saved successfully"
    );
  }
}
