"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Simulated props — you can later fetch or pass actual warning data
const mockWarnings = [
  { id: 1, type: "CPU", message: "High CPU usage (91%)" },
  { id: 2, type: "RAM", message: "High memory usage (83%)" },
  { id: 3, type: "Uptime", message: "System has been up for 14 days" },
];

export function SystemStatus() {
  const totalWarnings = mockWarnings.length;

  let status = "Good";
  let color = "text-green-600";
  let icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;

  if (totalWarnings === 1 || totalWarnings === 2) {
    status = "Warning";
    color = "text-yellow-600";
    icon = <AlertCircle className="w-5 h-5 text-yellow-600" />;
  } else if (totalWarnings >= 3) {
    status = "Critical";
    color = "text-red-600";
    icon = <AlertCircle className="w-5 h-5 text-red-600" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">System Status</h2>

      <div className={`text-sm font-medium flex items-center gap-2 ${color}`}>
        {icon}
        <span>System Health: {status}</span>
      </div>

      {totalWarnings > 0 ? (
        <div className="space-y-2">
          {mockWarnings.map((warning) => (
            <Alert key={warning.id} variant="destructive">
              <AlertTitle>{warning.type} Warning</AlertTitle>
              <AlertDescription>{warning.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No issues detected.</p>
      )}
    </div>
  );
}
