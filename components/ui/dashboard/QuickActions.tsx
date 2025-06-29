"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
        setScanResult({
          message: data.message,
          threatsFound: data.threatsFound ?? "N/A",
          lastScanTime: data.lastScanTime
            ? new Date(parseInt(data.lastScanTime.replace(/[^\d]/g, ""), 10)).toLocaleString()
            : "Unknown",
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🛡️ System Scan Results</DialogTitle>
          </DialogHeader>

          {scanResult && (
            <div className="space-y-2">
              <p><strong>Message:</strong> {scanResult.message}</p>
              <p><strong>Threats Found:</strong> {scanResult.threatsFound}</p>
              <p><strong>Last Scan:</strong> {scanResult.lastScanTime}</p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
