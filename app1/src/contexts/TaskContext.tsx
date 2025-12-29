import { createContext } from "react";
import type { Task, TaskInput } from "../types/task";

export type TaskContextType = {
    allTasks: Task[],
    isSaving: boolean,
    isPending: boolean,
    addOrUpdateTask: (task: TaskInput, editingId?: string | null) => void;
    deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);