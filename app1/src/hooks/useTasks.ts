import { useEffect, useRef, useState, useTransition } from "react";
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

    // focusing on input field while editing
    const inputRef = useRef<HTMLInputElement>(null);
    const isSubmittingRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevTaskCountRef = useRef<number>(0);

    useEffect(() => {
        if (editingTaskId) {
            inputRef.current?.focus();
        }
    }, [editingTaskId])


    // Load Tasks
    useEffect(() => {
        let storedTasks = localStorage.getItem("userTasks");
        if (storedTasks) {
            setAllTasks(JSON.parse(storedTasks));
        } else {
            setAllTasks([]);
        }
    }, [])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [])


    useEffect(() => {
        if (allTasks.length > prevTaskCountRef.current) {
            console.log("Task added")
        }

        if (allTasks.length < prevTaskCountRef.current) {
            console.log("Task deleted")
        }

        prevTaskCountRef.current = allTasks.length;
    }, [allTasks])



    // Save Task to Storage
    const saveTasks = (tasks: Task[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

        setIsSaving(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        startTransition(() => {
            timeoutRef.current = setTimeout(() => {
                setAllTasks(tasks);
                setIsSaving(false);
                isSubmittingRef.current = false;
            }, 800)
        })

    }


    const addOrUpdateTask = () => {
        if (!task.trim()) return;
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;


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
        editTask,

        //ref
        inputRef
    }




}