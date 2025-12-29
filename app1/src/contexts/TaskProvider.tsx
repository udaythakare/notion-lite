import { useEffect, useState, useTransition } from "react"
import type { Task, TaskInput } from "../types/task"
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./TaskContext";

const STORAGE_KEY = "userTasks";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setAllTasks(JSON.parse(stored));
    }, [])


    const saveTasks = (tasks: Task[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        setIsSaving(true);

        startTransition(() => {
            setTimeout(() => {
                setAllTasks(tasks);
                setIsSaving(false);
            }, 800)
        })

    }


    const addOrUpdateTask = (task: TaskInput, editingId?: string | null) => {
        const updated: Task[] = editingId
            ? allTasks.map(t =>
                t.id === editingId ? { ...t, ...task } : t
            )
            : [...allTasks, { ...task, id: uuidv4() }];

        saveTasks(updated);
    };

    const deleteTask = (id: string) => {
        const updated = allTasks.filter((t) => t.id !== id);
        saveTasks(updated);
    }






    return (
        <TaskContext.Provider value={{ allTasks, isPending, isSaving, addOrUpdateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}