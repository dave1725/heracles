"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Gauge,
  HardDrive,
  MemoryStick,
  Timer,
  AlertCircle,
  Cpu,
  Settings,
  Activity,
  ShieldCheck,
} from "lucide-react";

import axios from "axios";

// Helpers (not modified)
function parsePercentage(str: string): number {
  return parseFloat(str.replace("%", ""));
}

export function StatsCards() {
  const [cpuInfo, setCpuInfo] = useState<any>(null);
  const [ processorCount, setProcessorCount ] = useState<any>(null);
  const [memoryInfo, setMemoryInfo] = useState<any>(null);
  const [diskInfo, setDiskInfo] = useState<any>(null);
  const [uptimeMin, setUptimeMin] = useState<any>(null);
  const [uptimeHrs, setUptimeHrs] = useState<any>(null);
  const [ threadCount, setThreadCount ] = useState<any>(null);
  const [ name, setName ] = useState<any>(null);
  const [ currentSpeed, setCurrentSpeed ] = useState<any>();
  const [ maxSpeed, setMaxSpeed ] = useState<any>();
  const [ virtualization, setVirtualization ] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to fetch stats
  const fetchStats = async () => {
    setIsLoading(true);

    try {
      const [cpuRes, memoryRes, diskRes, uptimeRes] = await Promise.all([
        axios.get("http://localhost:3000/api/stats/system/cpu"),
        axios.get("http://localhost:3000/api/stats/system/memory"),
        axios.get("http://localhost:3000/api/stats/system/disk"),
        axios.get("http://localhost:3000/api/stats/system/uptime"),
      ]);

      setCpuInfo(cpuRes.data.cpuLoadPercentage);
      setProcessorCount(cpuRes.data.logicalProcessorCount);
      setThreadCount(cpuRes.data.threadCount);
      setName(cpuRes.data.name);
      setCurrentSpeed(cpuRes.data.currentSpeedMHz);
      setMaxSpeed(cpuRes.data.maxSpeedMHz);
      setVirtualization(cpuRes.data.virtualizationEnabled);
      setMemoryInfo(memoryRes.data.MemoryUsagePercentage);


      const diskData = diskRes.data;
      setDiskInfo(diskData);

      const { totalSize, usedSize } = diskData.reduce(
        (acc: any, item: any) => {
          acc.totalSize += parseFloat(item.totalGB) || 0;
          acc.usedSize += parseFloat(item.usedGB) || 0;
          return acc;
        },
        { totalSize: 0, usedSize: 0 }
      );

      if (totalSize > 0) {
        const percentage = ((usedSize / totalSize) * 100).toFixed(2);
        setDiskInfo(percentage);
      }

      setUptimeHrs(uptimeRes.data.uptimeHours);
      setUptimeMin(uptimeRes.data.uptimeMinutes);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Polling stats every 5 seconds
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

  if (!cpuInfo || !memoryInfo || !diskInfo || !uptimeHrs) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      label: "CPU Usage",
      value: `${cpuInfo}%`,
      icon: <Gauge className="w-5 h-5 text-primary" />,
      warning: cpuInfo.cpuLoadPercentage >= 85,
      warningMessage: "High CPU usage",
    },
    {
      label: "Current Speed",
      value: `${currentSpeed} MHz`,
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      label: "Max Speed",
      value: `${maxSpeed} MHz`,
      icon: <Settings className="w-5 h-5 text-primary" />,
    },
    {
      label: "Virtualization(Firmware)",
      value: virtualization ? "Enabled" : "Disabled",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    },
    {
      label: "Threads",
      value: `${threadCount}`,
      icon: <Cpu className="w-5 h-5 text-primary" />,
    },
    {
      label: "Logical Processors",
      value: `${processorCount}`,
      icon: <Cpu className="w-5 h-5 text-primary" />,
    },
    {
      label: "RAM Usage",
      value: `${memoryInfo}%`,
      icon: <MemoryStick className="w-5 h-5 text-primary" />,
      warning: memoryInfo >= 85,
      warningMessage: "High memory usage",
    },
    {
      label: "Disk Usage",
      value: `${diskInfo}%`,
      icon: <HardDrive className="w-5 h-5 text-primary" />,
      warning: diskInfo >= 90,
      warningMessage: "Low disk space",
    },
    {
      label: "System Uptime",
      value: `Since ${uptimeHrs}H:${uptimeMin}m`,
      icon: <Timer className="w-5 h-5 text-primary" />,
      warning: uptimeHrs >= 12,
      warningMessage: "Please restart soon",
    },
  ];


  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.warning && (
                <div className="text-sm text-destructive flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {stat.warningMessage}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
