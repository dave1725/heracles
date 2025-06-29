"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WindowsUpdates() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [installing, setInstalling] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    const res = await fetch("/api/stats/system/updates");
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  const installUpdates = async () => {
    setInstalling(true);
    const res = await fetch("/api/stats/system/updates?install=1");
    const json = await res.json();
    setData(json);
    setInstalling(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (!data) {
    return <p className="text-sm text-muted-foreground">Loading Windows Update status...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Windows Updates</h2>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle className="text-base">Update Status</CardTitle>
          
          <div className="flex gap-2">
            <Button size="sm" onClick={fetchStatus} disabled={loading}>
              {loading ? "Checking..." : "Check Again"}
            </Button>
            {/* <Button
              size="sm"
              variant="secondary"
              onClick={installUpdates}
              disabled={!data.updatesAvailable || installing}
            >
              {installing ? "Installing..." : "Install Updates"}
            </Button> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-gray-500">Please install the updates at your earliest convenience</p>
          <div className="flex justify-between">
            <span>Last Checked:</span>
            <span>{data.lastChecked}</span>
          </div>

          <div className="flex justify-between">
            <span>Status:</span>
            <span className={data.updatesAvailable ? "text-yellow-600 font-medium" : "text-green-600"}>
              {data.updatesAvailable ? (
                <>
                  <RefreshCw className="inline w-4 h-4 mr-1" />
                  Some updates pending
                </>
              ) : (
                <>
                  <CheckCircle2 className="inline w-4 h-4 mr-1" />
                  Up to date
                </>
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Reboot Required:</span>
            <span className={data.rebootRequired ? "text-red-600 font-semibold" : ""}>
              {data.rebootRequired ? (
                <>
                  <AlertCircle className="inline w-4 h-4 mr-1" />
                  Yes
                </>
              ) : (
                "No"
              )}
            </span>
          </div>

          {data.updatesAvailable && (
            <div className="mt-4">
              <p className="font-medium mb-1">Pending Updates:</p>
              <ul className="list-disc pl-5 text-muted-foreground">
                {data.pendingUpdates.map((update: string, i: number) => (
                  <li key={i}>{update}</li>
                ))}
              </ul>
            </div>
          )}

          {data.installResult && (
            <div className="text-sm text-muted-foreground">
              <p className="mt-4 font-medium">Install Result:</p>
              <p>Code: {data.installResult.ResultCode}</p>
              <p>Reboot Needed: {data.installResult.RebootRequired ? "Yes" : "No"}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
