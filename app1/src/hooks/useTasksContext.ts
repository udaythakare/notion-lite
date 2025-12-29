import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export const useTasksContext = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasksContext must be used inside TaskProvider");
    }

    return context;
};
