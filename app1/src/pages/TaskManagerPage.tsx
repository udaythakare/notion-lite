import { useEffect, useState } from "react"

type Task = {
    task: string
    priority: string
    status: string
}

const TaskManagerPage = () => {
    const [task, setTask] = useState<string>("")
    const [priority, setPriority] = useState<string>("low")
    const [status, setStatus] = useState<string>("Pending")
    const [allTasks, setAllTasks] = useState<any[]>([]);



    const handleAddTask = () => {
        const newTask: Task = { task, priority, status };

        const stored = localStorage.getItem("userTasks");
        const tasks: Task[] = stored ? JSON.parse(stored) : [];

        tasks.push(newTask);
        localStorage.setItem("userTasks", JSON.stringify(tasks));
        setAllTasks(tasks);


        setTask("");
        setPriority("low");
        setStatus("Pending");
    }

    useEffect(() => {
        let storedTasks = localStorage.getItem("userTasks");
        if (storedTasks) {
            setAllTasks(JSON.parse(storedTasks));
        } else {
            setAllTasks([]);
        }
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-5">

                    {/* Header */}
                    <h1 className="text-xl font-semibold text-gray-800">
                        Task Manager
                    </h1>

                    {/* Task Input */}
                    <input
                        type="text"
                        placeholder="Enter your task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Status
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Completed"
                                    checked={status === "Completed"}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="accent-blue-600"
                                />
                                Completed
                            </label>

                            <label className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Pending"
                                    checked={status === "Pending"}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="accent-blue-600"
                                />
                                Pending
                            </label>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleAddTask}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <div>
                {allTasks.map((task, index) => (
                    <div key={index}>
                        {task.task}
                        {task.priority}
                        {task.status}
                    </div>
                ))}
            </div>
        </>
    )
}

export default TaskManagerPage
