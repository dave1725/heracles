"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { RocketIcon, Trash2, RefreshCcw, Search } from "lucide-react";
import { toast } from "sonner";

export function QuickActions() {
  const [loading, setLoading] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRun = async (script: string) => {
  const actionNames: Record<string, string> = {
    cleanTemp: "Cleaning Temp Files",
    flushDNS: "Flushing DNS Cache",
    systemScan: "Running System Scan",
    restartExplorer: "Restarting Explorer",
  };

  const actionLabel = actionNames[script] || "Running Action";
  const toastId = toast.loading(`${actionLabel}...`);

  try {
    setLoading(script);

    const res = await fetch("/api/stats/system/quick-action", {
      method: "POST",
      body: JSON.stringify({ action: script }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success && script === "systemScan") {
      const match = data.lastScanTime?.match(/\d+/);
      const timestamp = match ? Number(match[0]) : Date.now();
      const convertedDate = new Date(timestamp);
      console.log(data.success);

      setScanResult({
        message: data.message,
        status: data.success ? "Scan Successfull": "Something Failed",
        threatsFound: data.malwareDetected || "No threats found",
        lastScanTime: convertedDate,
      });

      setIsModalOpen(true);
      toast.success("System scan completed.", { id: toastId, duration: 3000 });
    } else {
      toast.success(data.message || `${actionLabel} completed.`, { id: toastId });
    }
  } catch (error: any) {
    toast.error(`❌ Failed: ${actionLabel}`, { id: toastId });
  } finally {
    setLoading(null);
  }
};


  const actions = [
    {
      label: "Clean Temp Files",
      icon: <Trash2 className="w-4 h-4 mr-2" />,
      script: "cleanTemp",
    },
    {
      label: "Flush DNS Cache",
      icon: <RefreshCcw className="w-4 h-4 mr-2" />,
      script: "flushDNS",
    },
    {
      label: "Run Quick System Scan",
      icon: <Search className="w-4 h-4 mr-2" />,
      script: "systemScan",
    },
    {
      label: "Restart Explorer",
      icon: <RocketIcon className="w-4 h-4 mr-2" />,
      script: "restartExplorer",
    },
  ];

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={() => handleRun(action.script)}
            disabled={loading === action.script}
            className="flex items-center justify-center"
            variant="outline"
          >
            {action.icon}
            {loading === action.script ? "Running..." : action.label}
          </Button>
        ))}
      </div>

   

<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-xl flex items-center gap-2">
        🛡️ System Scan Summary
      </DialogTitle>
    </DialogHeader>

    {scanResult && (
      <div className="space-y-3 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Message:</span>{" "}
          {scanResult.message}
        </div>
        <div>
          <span className="font-medium text-foreground">Status:</span>{" "}
          {scanResult.status || "Success"}
        </div>
        <div>
          <span className="font-medium text-foreground">Threats Found:</span>{" "}
          {scanResult.threatsFound}
        </div>
        <div>
          <span className="font-medium text-foreground">Last Scan:</span>{" "}
          {scanResult.lastScanTime.toLocaleString()}
 
        </div>
      </div>
    )}

    <DialogFooter>
      <Button onClick={() => setIsModalOpen(false)} className="mt-2">
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </>
  );
}
