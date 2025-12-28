import { useEffect, useState, useTransition } from "react";
import type { Task } from "../types/task";
const STORAGE_KEY = "userTasks";
import { v4 as uuidv4 } from "uuid";

export const useTasks = () => {
    const [task, setTask] = useState<string>("")
    const [priority, setPriority] = useState<string>("low")
    const [status, setStatus] = useState<string>("Pending")
    const [allTasks, setAllTasks] = useState<any[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isSaving, setIsSaving] = useState(false);


    // Load Tasks
    useEffect(() => {
        let storedTasks = localStorage.getItem("userTasks");
        if (storedTasks) {
            setAllTasks(JSON.parse(storedTasks));
        } else {
            setAllTasks([]);
        }
    }, [])



    // Save Task to Storage
    const saveTasks = (tasks: Task[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

        setIsSaving(true);

        startTransition(() => {
            setTimeout(() => {
                setAllTasks(tasks);
                setIsSaving(false);
            }, 800)
        })

    }


    const addOrUpdateTask = () => {
        if (!task.trim()) return;


        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [];

        const updatedTasks = editingTaskId ? tasks.map((t: Task) => t.id === editingTaskId ? { ...t, task, priority, status } : t) : [...tasks, { id: uuidv4(), task, priority, status }];

        saveTasks(updatedTasks);
        resetForm();
    }


    const deleteTask = (id: string) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        const tasks: Task[] = JSON.parse(stored);
        saveTasks(tasks.filter(t => t.id !== id))
    }


    const editTask = (id: string) => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return

        const tasks: Task[] = JSON.parse(stored)
        const found = tasks.find(t => t.id === id)
        if (!found) return

        setTask(found.task)
        setPriority(found.priority)
        setStatus(found.status)
        setEditingTaskId(id)
    }



    const resetForm = () => {
        setTask("");
        setPriority("");
        setStatus("");
        setEditingTaskId(null);
    }



    return {
        //state
        task,
        priority,
        status,
        allTasks,
        editingTaskId,
        isSaving,
        isPending,


        //setters

        setTask,
        setPriority,
        setStatus,


        //actions
        addOrUpdateTask,
        deleteTask,
        editTask
    }




}