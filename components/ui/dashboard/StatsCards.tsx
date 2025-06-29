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
  ThermometerSun,
} from "lucide-react";
import axios from "axios";

export function StatsCards() {
  const [cpuInfo, setCpuInfo] = useState<any>(null);
  const [memoryInfo, setMemoryInfo] = useState<any>(null);
  const [diskUsage, setDiskUsage] = useState<any>(null);
  const [uptime, setUptime] = useState<string | null>(null);
  const [thermalData, setThermalData] = useState<any>(null);
  const [cpuDetails, setCpuDetails] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchStats = async () => {
    try {
      const [cpuRes, memoryRes] = await Promise.all([
        axios.get("/api/stats/system/cpu"),
        axios.get("/api/stats/system/memory"),
      ]);

      setCpuInfo(cpuRes.data.cpuLoadPercentage);
      setCpuDetails(cpuRes.data);
      setMemoryInfo(memoryRes.data.MemoryUsagePercentage);

      // Fetch other data non-blocking
      axios.get("/api/stats/system/disk").then((res) => {
        const diskData = res.data;
        const { totalSize, usedSize } = diskData.reduce(
          (acc: any, item: any) => {
            acc.totalSize += item.totalGB || 0;
            acc.usedSize += item.usedGB || 0;
            return acc;
          },
          { totalSize: 0, usedSize: 0 }
        );
        const percentage = totalSize > 0 ? ((usedSize / totalSize) * 100).toFixed(2) : "0";
        setDiskUsage(percentage);
      });

      axios.get("/api/stats/system/uptime").then((res) => {
        setUptime(`Since ${res.data.uptimeHours}H:${res.data.uptimeMinutes}m`);
      });

      axios.get("/api/stats/system/thermal").then((res) => {
        setThermalData(res.data);
      });
    } catch (err) {
      console.error("Error fetching core stats:", err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(fetchStats, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div className="text-destructive">Failed to load system stats.</div>;

  if (
    cpuInfo === null ||
    memoryInfo === null ||
    diskUsage === null ||
    uptime === null ||
    !thermalData ||
    !cpuDetails
  ) {
    return <div className="text-muted-foreground text-sm">Gathering stats...</div>;
  }

  const stats = [
    {
      label: "CPU Usage",
      value: `${cpuInfo}%`,
      icon: <Gauge className="w-5 h-5 text-primary" />,
      warning: cpuInfo >= 85,
      warningMessage: "High CPU usage",
    },
    {
      label: "Current Speed",
      value: `${cpuDetails.currentSpeedMHz} MHz`,
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      label: "Max Speed",
      value: `${cpuDetails.maxSpeedMHz} MHz`,
      icon: <Settings className="w-5 h-5 text-primary" />,
    },
    {
      label: "Virtualization(Firmware)",
      value: cpuDetails.virtualizationEnabled ? "Enabled" : "Disabled",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    },
    {
      label: "Threads",
      value: `${cpuDetails.threadCount}`,
      icon: <Cpu className="w-5 h-5 text-primary" />,
    },
    {
      label: "Logical Processors",
      value: `${cpuDetails.logicalProcessorCount}`,
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
      value: `${diskUsage}%`,
      icon: <HardDrive className="w-5 h-5 text-primary" />,
      warning: diskUsage >= 90,
      warningMessage: "Low disk space",
    },
    {
      label: "System Uptime",
      value: uptime,
      icon: <Timer className="w-5 h-5 text-primary" />,
      warning: parseInt(uptime) >= 12,
      warningMessage: "Please restart soon",
    },
    {
      label: "Temperature",
      value: `${thermalData.TemperatureCelsius} C`,
      icon: <ThermometerSun className="w-5 h-5 text-primary" />,
      warning: thermalData.TemperatureCelsius >= 80,
      warningMessage: "Please shutdown your system",
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
