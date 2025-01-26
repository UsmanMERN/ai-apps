// lib/websocket.js
import { WebSocketServer } from "ws";
import { networkInterfaces } from "os";

// Real-time Network Monitor
class NetworkPulse {
  constructor() {
    this.metrics = {
      latency: 0,
      packetLoss: 0,
      bandwidth: 0,
      connections: 0,
    };
    this.startMonitoring();
  }

  startMonitoring() {
    setInterval(() => {
      const interfaces = networkInterfaces();
      this.metrics = {
        latency: Math.random() * 100,
        packetLoss: Math.random() * 5,
        bandwidth: 1e6 + Math.random() * 9e6,
        connections: Object.values(interfaces).reduce(
          (acc, curr) => acc + curr.length,
          0
        ),
      };
    }, 2000);
  }
}

// Export networkPulse
export const networkPulse = new NetworkPulse();

export function configureWSS(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    const sendRealtimeMetrics = () => {
      ws.send(
        JSON.stringify({
          type: "NETWORK_PULSE",
          data: networkPulse.metrics,
        })
      );
    };

    const interval = setInterval(sendRealtimeMetrics, 1000);

    ws.on("close", () => clearInterval(interval));
  });
}
