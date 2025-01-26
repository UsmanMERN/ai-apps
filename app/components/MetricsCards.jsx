// components/MetricsCards.jsx
"use client";

import { Wifi, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const MetricsCards = ({ metrics }) => {
    const latestMetric = metrics[metrics.length - 1] || {
        bandwidth: 0,
        latency: 0,
        packetLoss: 0,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
                {
                    icon: <Wifi className="h-6 w-6 text-indigo-600" />,
                    title: "Bandwidth",
                    value: `${latestMetric.bandwidth.toFixed(2)} Mbps`,
                },
                {
                    icon: <Clock className="h-6 w-6 text-indigo-600" />,
                    title: "Latency",
                    value: `${latestMetric.latency.toFixed(2)} ms`,
                },
                {
                    icon: <AlertTriangle className="h-6 w-6 text-indigo-600" />,
                    title: "Packet Loss",
                    value: `${latestMetric.packetLoss.toFixed(2)}%`,
                },
            ].map((metric, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center">
                        {metric.icon}
                        <h3 className="ml-2 text-lg font-medium text-gray-800">
                            {metric.title}
                        </h3>
                    </div>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {metric.value}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};