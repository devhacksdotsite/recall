import { EntityType } from "../types/EntityType.js";

export interface Requirement {
  id: string;
  type: EntityType.REQUIREMENT;

  name: string;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

