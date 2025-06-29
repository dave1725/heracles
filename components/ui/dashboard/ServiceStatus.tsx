"use client";

import {
  CheckCircle2,
  XCircle,
  PauseCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Service = {
  id: string;
  name: string;
  displayName: string;
  status: "running" | "stopped" | "paused";
};

const mockServices: Service[] = [
  {
    id: "1",
    name: "wuauserv",
    displayName: "Windows Update",
    status: "running",
  },
  {
    id: "2",
    name: "Winmgmt",
    displayName: "Windows Management Instrumentation",
    status: "running",
  },
  {
    id: "3",
    name: "wscsvc",
    displayName: "Security Center",
    status: "stopped",
  },
  {
    id: "4",
    name: "BITS",
    displayName: "Background Intelligent Transfer Service",
    status: "paused",
  },
];

function getStatusIcon(status: Service["status"]) {
  switch (status) {
    case "running":
      return <CheckCircle2 className="w-5 h-5 text-green-600" aria-label="Running" />;
    case "stopped":
      return <XCircle className="w-5 h-5 text-red-600" aria-label="Stopped" />;
    case "paused":
      return <PauseCircle className="w-5 h-5 text-yellow-600" aria-label="Paused" />;
    default:
      return null;
  }
}

export function ServicesStatus() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Services Status</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Key Windows Services</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {mockServices.map(({ id, displayName, status }) => (
            <div key={id} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-sm text-muted-foreground">{status.toUpperCase()}</p>
              </div>
              <div>{getStatusIcon(status)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
