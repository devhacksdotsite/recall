import { SaveService } from "../../application/save/SaveService.js";

export class SaveCommand {
  constructor(
    private readonly saveService: SaveService
  ) {}

  async execute(
    input: string
  ): Promise<void> {
    await this.saveService.save(
      input
    );
  }
}
