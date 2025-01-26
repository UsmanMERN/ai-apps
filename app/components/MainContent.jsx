// components/MainContent.jsx
"use client";

import { motion } from "framer-motion";
import { MetricsCards } from "./MetricsCards";
import { ChartsSection } from "./ChartsSection";
import { PredictionPanel } from "./PredictionPanel";
import { AlertsList } from "./AlertsList";

export const MainContent = ({
    metrics,
    prediction,
    isLoading,
    error,
    downtime,
    user,
}) => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md"
                >
                    <p className="text-red-700">{error}</p>
                </motion.div>
            )}

            {downtime > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"
                >
                    <p className="text-yellow-700">
                        Network Downtime: {downtime} seconds
                    </p>
                </motion.div>
            )}

            {/* <MetricsCards metrics={metrics} /> */}

            <ChartsSection metrics={metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {user && (
                    <PredictionPanel prediction={prediction} loading={isLoading} />
                )}
            </div>

            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
                <h3 className="text-lg font-medium mb-4 text-gray-800">Recent Alerts</h3>
                <AlertsList alerts={mockAlerts} />
            </motion.div> */}
        </main>
    );
};