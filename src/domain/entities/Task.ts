import { EntityType } from "../types/EntityType";

export interface Task {
  id: string;
  type: EntityType.TASK;

  title: string;
  completed: boolean;

  createdAt: Date;
  updatedAt: Date;
}
