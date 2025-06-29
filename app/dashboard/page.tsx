import { StatsCards } from "@/components/ui/dashboard/StatsCards";
import { QuickActions } from "@/components/ui/dashboard/QuickActions";
import { SystemStatus } from "@/components/ui/dashboard/SystemStatus";
import Navbar from "../navbar/page";
import { SystemInfo } from "@/components/ui/dashboard/SystemInfo";
import { DisksOverview } from "@/components/ui/dashboard/DiskOverview";
import { StartupPrograms } from "@/components/ui/dashboard/StartupPrograms";
import { WindowsUpdates } from "@/components/ui/dashboard/WindowsUpdates";
import { SecurityCenter } from "@/components/ui/dashboard/SecurityCenter";
import { RecentLogs } from "@/components/ui/dashboard/RecentLogs";
import { ServicesStatus } from "@/components/ui/dashboard/ServiceStatus";
import { NetworkIcon } from "lucide-react";
import { NetworkInfo } from "@/components/ui/dashboard/NetworkInfo";

export default function DashboardPage() {
  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats section */}
      <QuickActions />
      <StatsCards />
      <SystemInfo />
      <DisksOverview />
      {/* <SystemStatus /> */}
      <StartupPrograms />
      <WindowsUpdates />
      <SecurityCenter />
      <RecentLogs />
      <ServicesStatus />
      <NetworkInfo />

      {/* Next sections will go here */}
      {/* <RecentLogs /> */}
    </div>
    </>
  );
}
