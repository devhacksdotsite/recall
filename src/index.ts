import { loadConfig } from "./config/index.js";

import { MemoryStore } from "./infrastructure/memory/MemoryStore.js";

import { SaveService } from "./application/save/SaveService.js";
import { SummaryGenerator } from "./application/save/SummaryGenerator.js";

import { SaveCommand } from "./interfaces/commands/SaveCommand.js";

export async function runCLI(): Promise<void> {
  const config = loadConfig();

  /**
   * Infrastructure
   */
  const memoryStore = new MemoryStore(
    config.memoryPath
  );

  /**
   * Application services
   */
  const summaryGenerator =
    new SummaryGenerator();

  const saveService =
    new SaveService(
      memoryStore,
      summaryGenerator
    );

  /**
   * Commands
   */
  const saveCommand =
    new SaveCommand(saveService);

  /**
   * Parse CLI args
   *
   * Example:
   * npm run dev -- /save "Fixed DST bug in scheduler"
   */
  const [, , command, ...args] =
    process.argv;

  const payload = args.join(" ");

  /**
   * Guard
   */
  if (!command) {
    console.log("No command provided");
    return;
  }

  /**
   * Route commands
   */
  switch (command) {
    case "/save":
      await saveCommand.execute(
        payload
      );
      break;

    default:
      console.log(
        `Unknown command: ${command}`
      );
  }
}
