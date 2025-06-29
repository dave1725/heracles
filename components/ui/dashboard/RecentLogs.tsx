"use client";

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  // Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  message: string;
};

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-06-28 10:15:34",
    level: "info",
    message: "System cleanup completed successfully.",
  },
  {
    id: "2",
    timestamp: "2025-06-28 09:45:12",
    level: "warning",
    message: "Disk C: usage reached 90%.",
  },
  {
    id: "3",
    timestamp: "2025-06-28 09:00:00",
    level: "error",
    message: "Failed to apply Windows update KB5027123.",
  },
];

function getIcon(level: LogEntry["level"]) {
  switch (level) {
    case "info":
      return <CheckCircle2 className="w-5 h-5 text-green-600" aria-label="Info" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" aria-label="Warning" />;
    case "error":
      return <XCircle className="w-5 h-5 text-red-600" aria-label="Error" />;
    default:
      return null;
  }
}

export function RecentLogs() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Logs</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">System Activity Logs</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {mockLogs.map(({ id, timestamp, level, message }) => (
            <div key={id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {getIcon(level)}
                <div>
                  <p className="text-sm font-medium">{message}</p>
                  <p className="text-xs text-muted-foreground">{timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
