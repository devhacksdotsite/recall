import { EntityType } from "../types/EntityType.js";

export interface Task {
  id: string;
  type: EntityType.TASK;

  title: string;
  completed: boolean;

  createdAt: Date;
  updatedAt: Date;
}
