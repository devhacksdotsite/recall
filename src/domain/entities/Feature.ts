import { EntityType } from "../types/EntityType.js";

export interface Feature {
  id: string;
  type: EntityType.FEATURE;

  name: string;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}
