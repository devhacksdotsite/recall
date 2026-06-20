import { EntityType } from "../types/EntityType.js";

export interface Descision {
  id: string;
  type: EntityType.DECISION;

  title: string;
  rationale?: string;

  createdAt: Date;
  updatedAt: Date;
}
