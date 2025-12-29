import { useMemo } from "react";
import { useTasksContext } from "../hooks/useTasksContext"
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Sparkles, Target, Zap } from "lucide-react";

const HomePage = () => {
    const { allTasks } = useTasksContext();

    const stats = useMemo(() => {
        const completed = allTasks.filter(t => t.status === "Completed").length;
        const pending = allTasks.filter(t => t.status === "Pending").length;
        const highPriority = allTasks.filter(t => t.priority === "high").length;
        const mediumPriority = allTasks.filter(t => t.priority === "medium").length;
        const lowPriority = allTasks.filter(t => t.priority === "low").length;
        const completionRate = allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;

        return {
            total: allTasks.length,
            completed,
            pending,
            highPriority,
            mediumPriority,
            lowPriority,
            completionRate
        };
    }, [allTasks]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <Sparkles className="w-10 h-10 text-indigo-600 animate-pulse" />
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Task Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-600 text-xl">Your productivity at a glance</p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Tasks */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <Target className="w-8 h-8" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Total Tasks</p>
                                <p className="text-4xl font-bold">{stats.total}</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full w-full"></div>
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Completed</p>
                                <p className="text-4xl font-bold">{stats.completed}</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Pending</p>
                                <p className="text-4xl font-bold">{stats.pending}</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Completion Rate */}
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Completion</p>
                                <p className="text-4xl font-bold">{stats.completionRate}%</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${stats.completionRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Priority Breakdown */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Priority Distribution */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-indigo-200/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-7 h-7 text-indigo-600" />
                            <h2 className="text-2xl font-bold text-gray-800">Priority Breakdown</h2>
                        </div>

                        <div className="space-y-5">
                            {/* High Priority */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">High Priority</span>
                                    <span className="text-sm font-bold text-rose-600">{stats.highPriority}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
                                        style={{ width: `${stats.total > 0 ? (stats.highPriority / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Medium Priority */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Medium Priority</span>
                                    <span className="text-sm font-bold text-amber-600">{stats.mediumPriority}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                                        style={{ width: `${stats.total > 0 ? (stats.mediumPriority / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Low Priority */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Low Priority</span>
                                    <span className="text-sm font-bold text-emerald-600">{stats.lowPriority}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                                        style={{ width: `${stats.total > 0 ? (stats.lowPriority / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Motivational Card */}
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

                        <div className="relative z-10">
                            <Zap className="w-12 h-12 mb-4 animate-pulse" />
                            <h3 className="text-3xl font-bold mb-3">Keep Going! 🚀</h3>
                            <p className="text-lg opacity-90 mb-6 leading-relaxed">
                                {stats.completionRate >= 75
                                    ? "You're crushing it! Almost there!"
                                    : stats.completionRate >= 50
                                        ? "Great progress! Keep up the momentum!"
                                        : stats.completionRate >= 25
                                            ? "You're on your way! Stay focused!"
                                            : "Every journey starts with a single step!"}
                            </p>

                            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                <div className="flex-1">
                                    <p className="text-sm opacity-90 mb-1">Your Progress</p>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full transition-all duration-500"
                                            style={{ width: `${stats.completionRate}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold">{stats.completionRate}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {stats.total === 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet!</h3>
                        <p className="text-gray-600 mb-6">Start organizing your life by creating your first task.</p>
                        <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            Create Your First Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;