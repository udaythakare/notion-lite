import { useTasks } from "../hooks/useTasks";

const TaskManagerPage = () => {

    const {
        task,
        priority,
        status,
        allTasks,
        editingTaskId,
        isPending,
        isSaving,
        setTask,
        setPriority,
        setStatus,
        addOrUpdateTask,
        deleteTask,
        editTask
    } = useTasks();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

                {/* ================= FORM ================= */}
                <div className="bg-white rounded-xl shadow p-6 space-y-5">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Task Manager
                    </h1>

                    <input
                        type="text"
                        placeholder="Enter your task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Status
                        </label>
                        <div className="flex gap-6">
                            {["Pending", "Completed"].map((s) => (
                                <label
                                    key={s}
                                    className="flex items-center gap-2 text-gray-700 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={s}
                                        checked={status === s}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="accent-blue-600"
                                    />
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={isPending}
                        onClick={addOrUpdateTask}
                        className={`w-full py-2 rounded-lg font-medium transition
            ${editingTaskId
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
            text-white`}
                    >
                        {isPending ? "Saving..." : editingTaskId ? "Update Task" : "Add Task"}
                    </button>
                </div>

                {/* ================= TASK LIST ================= */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Your Tasks
                    </h2>

                    {(isPending || isSaving) && <p>Updating Tasks…</p>}


                    {allTasks.length === 0 && (
                        <p className="text-gray-500 text-sm">No tasks added yet.</p>
                    )}

                    <div className="space-y-3">
                        {allTasks.map((t) => (
                            <div
                                key={t.id}
                                className={`flex justify-between items-center p-4 border rounded-lg
                ${editingTaskId === t.id ? "bg-yellow-50 border-yellow-400" : "bg-gray-50"}
              `}
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{t.task}</p>

                                    <div className="flex gap-2 mt-1 text-xs">
                                        <span
                                            className={`px-2 py-0.5 rounded-full
                      ${t.priority === "high" && "bg-red-100 text-red-700"}
                      ${t.priority === "medium" && "bg-yellow-100 text-yellow-700"}
                      ${t.priority === "low" && "bg-green-100 text-green-700"}
                    `}
                                        >
                                            {t.priority}
                                        </span>

                                        <span
                                            className={`px-2 py-0.5 rounded-full
                      ${t.status === "Completed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-200 text-gray-700"
                                                }
                    `}
                                        >
                                            {t.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => editTask(t.id)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(t.id)}
                                        disabled={editingTaskId === t.id}
                                        className="text-red-600 text-sm hover:underline disabled:opacity-40"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TaskManagerPage
