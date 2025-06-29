"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, HardDriveIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Disk = {
  volumeName: string;
  deviceID: number,
  totalGB: number,
  usedGB: number,
  usedPercent: number;
  smartWarning?: boolean;
};



// const mockDisks: Disk[] = [
//   {
//     name: "C:",
//     fileSystem: "NTFS",
//     total: "512 GB",
//     used: "490 GB",
//     usagePercent: 95.7,
//     health: "Healthy",
//     smartWarning: true,
//   },
//   {
//     name: "D:",
//     fileSystem: "NTFS",
//     total: "1 TB",
//     used: "120 GB",
//     usagePercent: 12,
//     health: "Healthy",
//   },
// ];

export function DisksOverview() {
  const [disks,setDisks] = useState<Disk[]>([]);

  const fetchStats = () => {
  axios.get("http://localhost:3000/api/stats/system/disk").then((res)=>{
    setDisks(res.data);
  })
}

useEffect(() => {
    fetchStats(); // Fetch stats initially

    const intervalId = setInterval(() => {
      fetchStats(); // Fetch stats periodically
    }, 10000); // 5000 ms = 5 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!disks ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Disks Overview</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {disks.map((disk:Disk) => (
          <Card key={disk.volumeName}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <HardDriveIcon className="w-4 h-4" />
                {disk.volumeName}({disk.deviceID}) —
              </CardTitle>
              {disk.smartWarning && (
                <AlertCircle className="w-5 h-5 text-red-600" aria-label="SMART warning detected" />
              )}
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>{disk.totalGB} GB</span>
              </div>
              <div className="flex justify-between">
                <span>Used:</span>
                <span>{disk.usedGB} GB</span>
              </div>
              <div className="flex justify-between">
                <span>Usage:</span>
                <span className={disk.usedPercent >= 90 ? "text-red-600 font-medium" : ""}>
                  {disk.usedPercent}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Health:</span>
                <span className={disk.usedPercent >= 90 ? "text-red-600 font-medium" : "text-green-300 font-medium"}>
                  {disk.usedPercent >= 90 ? "CRITICAL" : "GOOD"}
                </span>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
