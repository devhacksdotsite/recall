import { loadConfig } from "../../config/index.js";
import { MemoryStore } from "../../infrastructure/memory/MemoryStore.js";
import { SaveService } from "../../application/save/SaveService.js";
import { SaveCommand } from "../commands/SaveCommand.js";

export async function runCLI(): Promise<void> {
  const config = loadConfig();

  const memoryStore = new MemoryStore(
    config.memoryPath
  );

  const saveService = new SaveService(
    memoryStore
  );

  const saveCommand = new SaveCommand(
    saveService
  );

  const [, , command, ...args] = process.argv;

  const payload = args.join(" ");

  if (!command) {
    console.log("No command provided");
    return;
  }

  if (command === "/save") {
    await saveCommand.execute(payload);
    return;
  }

  console.log(`Unknown command: ${command}`);
}
