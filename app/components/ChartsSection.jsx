// components/ChartsSection.jsx
"use client";

import { motion } from "framer-motion";
import { MetricsChart } from "./MetricsChart";
import { PacketLossChart } from "./PacketLossChart";

export const ChartsSection = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                    Bandwidth Trends
                </h3>
                <MetricsChart data={metrics} metric="bandwidth" color="#4f46e5" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                    Latency Trends
                </h3>
                <MetricsChart data={metrics} metric="latency" color="#059669" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                    Packet Loss Trends
                </h3>
                <PacketLossChart data={metrics} />
            </motion.div>
        </div>
    );
};