'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BatteryFull, BatteryCharging, BatteryLow, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import CpuPowerState from '@/components/ui/dashboard/CpuPowerState';
import { QuickActions } from '@/components/ui/dashboard/QuickActions';

const Performance = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cpu, setCpu] = useState<any>(null);
  const [memory, setMemory] = useState<any>(null);
  const [disk, setDisk] = useState<any>([]);
  const [battery, setBattery] = useState<any>(null);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [cpuRes, memRes, diskRes, battRes] = await Promise.all([
          fetch('/api/stats/system/cpu'),
          fetch('/api/stats/system/memory'),
          fetch('/api/stats/system/disk'),
          fetch('/api/stats/system/battery'),
        ]);

        const [cpuData, memData, diskData, battData] = await Promise.all([
          cpuRes.json(),
          memRes.json(),
          diskRes.json(),
          battRes.json(),
        ]);

        setCpu(cpuData);
        setMemory(memData);
        setDisk(diskData);
        setBattery(battData);
      } catch (err) {
        console.error('Error fetching performance stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  const renderBatteryIcon = (battery:any) => {
    if (!battery || battery.estimatedChargeRemaining == null) return <BatteryLow className="text-gray-400" />;
    if (battery.status === 'Charging') return <BatteryCharging className="text-green-500" />;
    if (battery.estimatedChargeRemaining > 75) return <BatteryFull className="text-green-500" />;
    if (battery.estimatedChargeRemaining > 30) return <BatteryFull className="text-yellow-500" />;
    return <BatteryLow className="text-red-500" />;
  };

  return (
    <div className="p-6 space-y-8">

      {/* Quick Actions */}
      <QuickActions />
      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Free Up RAM', 'Clear Temp Files', 'Empty Recycle Bin', 'Flush DNS Cache', 'Restart Explorer', 'Optimize Drive', 'Pause Updates', 'Auto Boost'].map(action => (
            <Card key={action} className="hover:shadow-lg transition">
              <CardContent className="p-4 flex items-center justify-center text-center">
                <Button className="w-full text-sm">{action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Processor Power State */}
      <CpuPowerState />
      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">Processor Power State</h2>
        <Card>
          <CardHeader>
            <CardTitle>Max CPU Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Force 100% CPU state while plugged in.</p>
            <Switch />
          </CardContent>
        </Card>
      </section> */}

      {/* Resource Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resource Usage</h2>
        {loading ? <p className="text-sm text-muted-foreground">Loading stats...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* CPU */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <CardTitle>CPU</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Load: {cpu.cpuLoadPercentage}%</div>
                <div>Speed: {cpu.currentSpeedMHz} MHz / {cpu.maxSpeedMHz} MHz</div>
                <div>Logical CPUs: {cpu.logicalProcessorCount}</div>
                <div>Virtualization: {cpu.virtualizationEnabled ? 'Enabled' : 'Disabled'}</div>
              </CardContent>
            </Card>

            {/* Memory */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <MemoryStick className="w-5 h-5" />
                <CardTitle>RAM</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Used: {memory.UsedMemoryMB} GB / {memory.TotalMemoryMB} GB</div>
                <div>Memory Usage: {memory.MemoryUsagePercentage}%</div>
                <div>Free Memory: {memory.FreeMemoryMB} GB</div>
                <div>Committed Memory: {memory.CommittedMemoryMB} GB</div>
                <div>Virtual Memory: {memory.VirtualMemoryMB} GB</div>

              </CardContent>
            </Card>

            {/* Disk */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                <CardTitle>Disks</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                {disk.map((d:any) => (
                  <div key={d.deviceID}>
                    <strong>{d.deviceID}:</strong> {d.usedGB} GB used / {d.totalGB} GB ({d.usedPercent}%)
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Battery */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                {renderBatteryIcon(battery)}
                <CardTitle>Battery</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                {battery?.estimatedChargeRemaining != null ? (
                  <>
                    <div>Charge: {battery.estimatedChargeRemaining}%</div>
                    <div>Status: {battery.status}</div>
                    <div>Run Time: {battery.estimatedRunTime}</div>
                  </>
                ) : (
                  <div>No battery detected</div>
                )}
              </CardContent>
            </Card>

          </div>
        )}
      </section>
    </div>
  );
};

export default Performance;
