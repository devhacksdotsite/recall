import fs from "fs";
import path from "path";

const MEMORY_FILES = [
  "architecture.md",
  "requirements.md",
  "decisions.md",
  "tasks.md",
  "project-summary.md",
  "entities.md",
];

// Description: Creates missing files automatically.
export class MemoryBootstrap {
  static initialize(memoryPath: string): void {
    if (!fs.existsSync(memoryPath)) {
      fs.mkdirSync(memoryPath, {
        recursive: true,
      });
    }

    for (const file of MEMORY_FILES) {
      const filePath = path.join(
        memoryPath,
        file
      );

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
          filePath,
          `# ${file.replace(".md", "")}\n`
        );
      }
    }
  }
}