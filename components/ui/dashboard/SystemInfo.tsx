"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:3000/api/stats/system/info")
      .then((res) => {
        setSystemInfo(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch system information.");
        console.error("Error fetching system information:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Return loading or error message if data is not available yet
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !systemInfo) {
    return <div>{error || "Failed to load system information."}</div>;
  }

  // Grouping the data for display
  const generalInfo = [
    { label: "Host Name", value: systemInfo["Host Name"] },
    { label: "OS Name", value: systemInfo["OS Name"] },
    { label: "OS Version", value: systemInfo["OS Version"] },
    { label: "OS Manufacturer", value: systemInfo["OS Manufacturer"] },
    { label: "OS Build Type", value: systemInfo["OS Build Type"] },
    { label: "Registered Owner", value: systemInfo["Registered Owner"] },
    { label: "Registered Organization", value: systemInfo["Registered Organization"] },
    { label: "System Manufacturer", value: systemInfo["System Manufacturer"] },
    { label: "System Model", value: systemInfo["System Model"] },
    { label: "BIOS Version", value: systemInfo["BIOS Version"] },
  ];

  const memoryInfo = [
    { label: "Total Physical Memory", value: systemInfo["Total Physical Memory"] },
    { label: "Available Physical Memory", value: systemInfo["Available Physical Memory"] },
    { label: "Virtual Memory", value: systemInfo["Virtual Memory"] },
    { label: "System Type", value: systemInfo["System Type"]}
  ];

  const networkInfo = [
    { label: "Network Card(s)", value: systemInfo["Network Card(s)"] },
    { label: "Connection Name", value: systemInfo["Connection Name"] },
    { label: "Status", value: systemInfo["Status"] },
    { label: "DHCP Enabled", value: systemInfo["DHCP Enabled"]}
  ];

  const systemTime = [
    { label: "System Boot Time", value: systemInfo["System Boot Time"] },
    { label: "Original Install Date", value: systemInfo["Original Install Date"] },
    { label: "Domain", value: systemInfo["Domain"] },
    { label: "Logon Server", value: systemInfo["Logon Server"] },
    { label: "Time Zone", value: systemInfo["Time Zone"] },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">System Information</h2>

      {/* General Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            {generalInfo.map((item) => (
              <div key={item.label} className="flex justify-between border-b py-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Memory Info */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Memory Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            {memoryInfo.map((item) => (
              <div key={item.label} className="flex justify-between border-b py-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Info */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Network Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            {networkInfo.map((item) => (
              <div key={item.label} className="flex justify-between border-b py-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Time */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">System Time Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            {systemTime.map((item) => (
              <div key={item.label} className="flex justify-between border-b py-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
