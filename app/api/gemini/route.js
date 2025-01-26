// app/api/gemini/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { networkPulse } from "../..//lib/websocket"; // Import networkPulse
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { query, historicalData } = await req.json();

    const prompt = `**Network Analysis Request**
      Query: ${query}
      Real-time Metrics: ${JSON.stringify(networkPulse.metrics)}
      History: ${JSON.stringify(historicalData || {})}

      Respond in this STRICT format:
      [SEVERITY: LEVEL]
      **Summary**: Max 10 words with emojis
      **Predictions**: 3 future network scenarios
      **Recommendations**: 3 actionable steps
      **Technical Analysis**: 50-100 word expert analysis`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(prompt);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullText = "";

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullText += chunkText;

          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                partial: chunkText,
                pulse: networkPulse.metrics,
              }) + "\n"
            )
          );
        }

        const enhanced = enhanceResponse(fullText, networkPulse.metrics);
        controller.enqueue(
          encoder.encode(JSON.stringify({ final: enhanced }) + "\n")
        );

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "X-API-Version": "NetworkPulsePro v3.1",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "🌩️ Network Storm Detected",
        message: "Our AI Routers are overwhelmed!",
        action: "Try again after 30 seconds",
        code: "NET_AI_OVERLOAD",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "30",
        },
      }
    );
  }
}

// AI Response Enhancer
const enhanceResponse = (text, realtimeMetrics) => {
  const analysisSchema = z.object({
    severity: z.enum(["LOW", "MEDIUM", "HIGH"]),
    summary: z.string(),
    predictions: z.array(z.string()),
    recommendations: z.array(z.string()),
    technical: z.string(),
  });

  try {
    const severityMatch = text.match(/\[SEVERITY: (\w+)\]/i);
    const summaryMatch = text.match(/\*\*Summary\*\*: (.*)/);
    const predictionsMatch = text.match(/\*\*Predictions\*\*: (.*)/);
    const recommendationsMatch = text.match(/\*\*Recommendations\*\*: (.*)/);
    const technicalMatch = text.match(/\*\*Technical Analysis\*\*: (.*)/s);

    const structuredData = analysisSchema.parse({
      severity: severityMatch?.[1] || "MEDIUM",
      summary:
        summaryMatch?.[1].replace(/\*\*/g, "🌟 ") || "No summary available",
      predictions: predictionsMatch?.[1].split(/,\s*/) || [],
      recommendations: recommendationsMatch?.[1].split(/,\s*/) || [],
      technical: technicalMatch?.[1] || "",
    });

    return {
      ...structuredData,
      realtime: {
        latency: realtimeMetrics.latency,
        packetLoss: realtimeMetrics.packetLoss,
        bandwidth: realtimeMetrics.bandwidth,
        connections: realtimeMetrics.connections,
      },
      visualization: {
        riskMatrix: generateRiskMatrix(),
        timeline: generateSmartTimeline(structuredData.severity),
      },
      timestamp: new Date().toISOString(),
      metadata: {
        engine: "NetworkPulsePro v3.0",
        responseId: uuidv4(),
      },
    };
  } catch (error) {
    console.error("Analysis Enhancement Error:", error);
    return {
      error: "🚀 AI Analysis Overload",
      message: "Failed to parse network insights",
      fallback: text,
    };
  }
};

// Real-time Visualization Generators
function generateRiskMatrix() {
  return Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () =>
      Math.random() > 0.7 ? "🔥" : Math.random() > 0.4 ? "⚠️" : "✅"
    )
  );
}

function generateSmartTimeline(severity) {
  const baseDate = new Date();
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(baseDate.setDate(baseDate.getDate() + 1)),
    riskLevel:
      Math.random() *
      (severity === "HIGH" ? 100 : severity === "MEDIUM" ? 70 : 40),
    actionRequired: Math.random() > 0.5,
  }));
}
