import { useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTasksContext } from "../hooks/useTasksContext";
import { useDebounce } from "../hooks/useDebounce";
import { CheckCircle2, Circle, Edit2, Plus, Search, Sparkles, Trash2 } from "lucide-react";

const TaskManagerPage = () => {
    const {
        allTasks,
        addOrUpdateTask,
        deleteTask,
        isSaving,
        isPending,
    } = useTasksContext();

    const {
        task,
        priority,
        status,
        editingTaskId,
        setTask,
        setPriority,
        setStatus,
        inputRef,
        setEditingTaskId
    } = useTasks();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const filteredTasks = useMemo(() => {
        return allTasks.filter(t =>
            t.task.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    }, [allTasks, debouncedSearch])




    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Task Manager
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">Organize your life, one task at a time</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search your tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-2 border-transparent focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Form Section */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 hover:shadow-indigo-200/50 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Plus className="w-6 h-6 text-indigo-600" />
                            {editingTaskId ? "Edit Task" : "Create New Task"}
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Task Description
                                </label>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="What needs to be done?"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Priority Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: "low", label: "Low", color: "emerald" },
                                        { value: "medium", label: "Medium", color: "amber" },
                                        { value: "high", label: "High", color: "rose" }
                                    ].map((p) => (
                                        <button
                                            key={p.value}
                                            onClick={() => setPriority(p.value)}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all ${priority === p.value
                                                ? `bg-${p.color}-500 text-white shadow-lg scale-105`
                                                : `bg-${p.color}-50 text-${p.color}-700 hover:bg-${p.color}-100`
                                                }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Status
                                </label>
                                <div className="flex gap-4">
                                    {["Pending", "Completed"].map((s) => (
                                        <label
                                            key={s}
                                            className="flex-1 cursor-pointer"
                                        >
                                            <div className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${status === s
                                                ? "bg-indigo-500 border-indigo-500 text-white shadow-lg"
                                                : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value={s}
                                                    checked={status === s}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="hidden"
                                                />
                                                {s === "Completed" ? (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                ) : (
                                                    <Circle className="w-5 h-5" />
                                                )}
                                                <span className="font-medium">{s}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={isPending || !task.trim()}
                                onClick={() => {
                                    addOrUpdateTask({ task, priority, status }, editingTaskId);
                                    setTask("");
                                    setPriority("medium");
                                    setStatus("Pending");
                                    setEditingTaskId(null);
                                }}
                                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${editingTaskId
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-300"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-300"
                                    }`}
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </span>
                                ) : editingTaskId ? (
                                    "Update Task"
                                ) : (
                                    "Add Task"
                                )}
                            </button>

                            {editingTaskId && (
                                <button
                                    onClick={() => {
                                        setTask("");
                                        setPriority("medium");
                                        setStatus("Pending");
                                        setEditingTaskId(null);
                                    }}
                                    className="w-full py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Task List Section */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 hover:shadow-purple-200/50 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Your Tasks
                            <span className="ml-3 text-lg font-normal text-gray-500">
                                ({filteredTasks.length})
                            </span>
                        </h2>

                        {(isPending || isSaving) && (
                            <div className="mb-4 p-3 bg-indigo-50 rounded-xl text-indigo-700 text-sm flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                Updating tasks...
                            </div>
                        )}

                        {allTasks.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-12 h-12 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg">No tasks yet</p>
                                <p className="text-gray-400 text-sm mt-1">Create your first task to get started!</p>
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No tasks match your search</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                {filteredTasks.map((t) => (
                                    <div
                                        key={t.id}
                                        className={`group p-5 border-2 rounded-2xl transition-all hover:shadow-lg ${editingTaskId === t.id
                                            ? "bg-amber-50 border-amber-300 shadow-lg"
                                            : "bg-white border-gray-200 hover:border-indigo-200"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 mb-2 break-words">
                                                    {t.task}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${t.priority === "high"
                                                            ? "bg-rose-100 text-rose-700"
                                                            : t.priority === "medium"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : "bg-emerald-100 text-emerald-700"
                                                            }`}
                                                    >
                                                        {t.priority}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${t.status === "Completed"
                                                            ? "bg-indigo-100 text-indigo-700"
                                                            : "bg-gray-200 text-gray-700"
                                                            }`}
                                                    >
                                                        {t.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setTask(t.task);
                                                        setPriority(t.priority);
                                                        setStatus(t.status);
                                                        setEditingTaskId(t.id);
                                                    }}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(t.id)}
                                                    disabled={editingTaskId === t.id}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TaskManagerPage
