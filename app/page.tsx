import { StatsCards } from "@/components/ui/dashboard/StatsCards";
import { QuickActions } from "@/components/ui/dashboard/QuickActions";
import Navbar from "./navbar/page";
import { SystemInfo } from "@/components/ui/dashboard/SystemInfo";
import { DisksOverview } from "@/components/ui/dashboard/DiskOverview";
import { RecentLogs } from "@/components/ui/dashboard/RecentLogs";
import { ServicesStatus } from "@/components/ui/dashboard/ServiceStatus";
import { NetworkInfo } from "@/components/ui/dashboard/NetworkInfo";
import Footer from "@/components/ui/dashboard/Footer";

export default function DashboardPage() {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <StatsCards />
      <SystemInfo />
      <DisksOverview />
      {/* <RecentLogs /> */}
      <NetworkInfo />
    
    </div>
    </>
  );
}
