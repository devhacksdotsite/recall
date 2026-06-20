import { EntityType } from "../types/EntityType.js";

export interface Project {
  id: string;
  type: EntityType.PROJECT;

  name: string;
  summary?: string;

  createdAt: Date;
  updatedAt: Date;
}
