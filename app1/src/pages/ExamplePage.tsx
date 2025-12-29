import React, { useCallback, useState } from 'react';
import { Plus, RotateCcw, Zap, TrendingUp, RefreshCw } from 'lucide-react';

const ExamplePage = () => {
    const [counter, setCounter] = useState(0);
    const [renderCount, setRenderCount] = useState(0);
    const [childRenderCount, setChildRenderCount] = useState(0);

    React.useEffect(() => {
        setRenderCount(prev => prev + 1);
    }, []);

    const handleClick = useCallback(() => {
        setCounter(prev => prev + 1);
    }, []);

    const handleReset = useCallback(() => {
        setCounter(0);
    }, []);

    console.log('parent rerendered');

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <Zap className="w-10 h-10 text-violet-600 animate-pulse" />
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                            React Counter
                        </h1>
                    </div>
                    <p className="text-gray-600 text-xl">Optimized with useCallback & React.memo</p>
                </div>

                {/* Main Counter Display */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 mb-8 text-center hover:shadow-violet-200/50 transition-all duration-300">
                    <div className="mb-6">
                        <p className="text-gray-600 text-lg mb-2">Current Count</p>
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-20 animate-pulse"></div>
                            <p className="relative text-8xl sm:text-9xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                                {counter}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((counter / 100) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Progress to 100</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ExamplePageChild
                            handleClick={handleClick}
                            setChildRenderCount={setChildRenderCount}
                        />

                        <button
                            onClick={handleReset}
                            className="group px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Reset Counter
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    {/* Parent Renders */}
                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <RefreshCw className="w-7 h-7" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Parent Renders</p>
                                <p className="text-4xl font-bold">{renderCount}</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-80">Every state update triggers parent re-render</p>
                    </div>

                    {/* Child Renders */}
                    <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <TrendingUp className="w-7 h-7" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium opacity-90">Child Renders</p>
                                <p className="text-4xl font-bold">{childRenderCount}</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-80">Optimized with React.memo & useCallback</p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-violet-100 rounded-2xl">
                            <Zap className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Performance Optimization</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                This demo showcases React performance optimization using <code className="px-2 py-1 bg-violet-100 text-violet-700 rounded">useCallback</code> and <code className="px-2 py-1 bg-violet-100 text-violet-700 rounded">React.memo</code>.
                                The child component only re-renders when absolutely necessary, preventing unnecessary computation.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">useCallback</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">React.memo</span>
                                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 text-sm font-medium rounded-full">Optimized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExamplePageChild = React.memo(({ handleClick, setChildRenderCount }) => {
    React.useEffect(() => {
        setChildRenderCount(prev => prev + 1);
    }, []);

    console.log("child rerendered");

    return (
        <button
            onClick={handleClick}
            className="group px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Increment Counter
        </button>
    );
});

export default ExamplePage;