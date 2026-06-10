import fs from "fs";
import path from "path";

// Provides read/write operations.
export class MemoryStore {
  constructor(
    private readonly memoryPath: string
  ) {}

  read(fileName: string): string {
    const filePath = path.join(
      this.memoryPath,
      fileName
    );

    return fs.readFileSync(
      filePath,
      "utf8"
    );
  }

  write(
    fileName: string,
    content: string
  ): void {
    const filePath = path.join(
      this.memoryPath,
      fileName
    );

    fs.writeFileSync(
      filePath,
      content
    );
  }

  append(
    fileName: string,
    content: string
  ): void {
    const filePath = path.join(
      this.memoryPath,
      fileName
    );

    fs.appendFileSync(
      filePath,
      content
    );
  }
}