import { useEffect, useRef, useState } from "react";

export const useTasks = () => {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("Pending");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingTaskId) inputRef.current?.focus();
    }, [editingTaskId]);

    const resetForm = () => {
        setTask("");
        setPriority("low");
        setStatus("Pending");
        setEditingTaskId(null);
    };

    return {
        task,
        priority,
        status,
        editingTaskId,
        setTask,
        setPriority,
        setStatus,
        setEditingTaskId,
        resetForm,
        inputRef
    };
};
