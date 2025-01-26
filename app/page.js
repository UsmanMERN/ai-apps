"use client";

// app/page.jsx

import React, { useState, useEffect } from "react";
// import { Navbar } from "../components/Navbar";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { measureNetworkSpeed } from "./lib/networkSpeed";
import { sendNotification } from "./lib/notifications";

const PERFORMANCE_THRESHOLDS = {
  bandwidth: 5,
  latency: 100,
  packetLoss: 2,
};

export default function Home() {
  // const [metrics, setMetrics] = useState([]);
  // const [prediction, setPrediction] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [updateInterval, setUpdateInterval] = useState(5000);
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const [error, setError] = useState(null);
  // const [downtime, setDowntime] = useState(0);
  // const [user] = useAuthState(auth);

  // // Track downtime
  // useEffect(() => {
  //   let downtimeInterval;
  //   if (metrics.length > 0) {
  //     const latestMetric = metrics[metrics.length - 1];
  //     if (
  //       latestMetric.bandwidth < PERFORMANCE_THRESHOLDS.bandwidth ||
  //       latestMetric.latency > PERFORMANCE_THRESHOLDS.latency ||
  //       latestMetric.packetLoss > PERFORMANCE_THRESHOLDS.packetLoss
  //     ) {
  //       downtimeInterval = setInterval(() => {
  //         setDowntime((prev) => prev + 1);
  //       }, 1000);
  //     } else {
  //       setDowntime(0);
  //     }
  //   }
  //   return () => clearInterval(downtimeInterval);
  // }, [metrics]);

  // // Save metrics to Firebase
  // const saveMetricsToFirebase = async (metrics) => {
  //   if (user) {
  //     const userRef = doc(db, "users", user.uid);
  //     await setDoc(userRef, { metrics }, { merge: true });
  //   }
  // };

  // // Fetch metrics from Firebase
  // const fetchMetricsFromFirebase = async () => {
  //   if (user) {
  //     const userRef = doc(db, "users", user.uid);
  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       setMetrics(docSnap.data().metrics || []);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchMetricsFromFirebase();
  // }, [user]);

  // const checkPerformanceIssues = async (metric) => {
  //   let message = null;

  //   if (metric.bandwidth < PERFORMANCE_THRESHOLDS.bandwidth) {
  //     message = `Low bandwidth detected: ${metric.bandwidth.toFixed(2)} Mbps`;
  //   } else if (metric.latency > PERFORMANCE_THRESHOLDS.latency) {
  //     message = `High latency detected: ${metric.latency.toFixed(2)} ms`;
  //   } else if (metric.packetLoss > PERFORMANCE_THRESHOLDS.packetLoss) {
  //     message = `High packet loss detected: ${metric.packetLoss.toFixed(2)}%`;
  //   }

  //   if (message && user) {
  //     await sendNotification(user.email, message, metric);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setError(null);
  //       const newMetrics = await measureNetworkSpeed();

  //       const updatedMetrics = [...metrics, newMetrics];
  //       if (updatedMetrics.length > 24) {
  //         updatedMetrics.shift();
  //       }
  //       setMetrics(updatedMetrics);
  //       saveMetricsToFirebase(updatedMetrics);

  //       checkPerformanceIssues(newMetrics);

  //       if (user) {
  //         setIsLoading(true);
  //         try {
  //           const newPrediction = await getPrediction(updatedMetrics);
  //           setPrediction(newPrediction);
  //         } catch (error) {
  //           console.error("Failed to get prediction:", error);
  //           setPrediction("Unable to generate prediction at this time.");
  //         }
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching network metrics:", error);
  //       setError("Failed to measure network metrics. Retrying...");
  //     }
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, updateInterval);
  //   return () => clearInterval(interval);
  // }, [updateInterval, metrics, user]);

  // const handleUpdateIntervalChange = (newInterval) => {
  //   setUpdateInterval(newInterval);
  // };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-indigo-100">
      <Hero />
      <Dashboard />
    </main>
  );
}
