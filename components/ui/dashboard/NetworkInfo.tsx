"use client";

import {
  Wifi,
  Monitor,
  CheckCircle2,
  XCircle,
  // Cpu,
  // WifiOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type NetworkAdapter = {
  id: string;
  name: string;
  status: "connected" | "disconnected";
  ipv4: string;
  ipv6?: string;
  dns: string[];
  speedMbps?: number;
  type: "ethernet" | "wifi";
  ssid?: string; // for wifi
};

// const mockAdapters: NetworkAdapter[] = [
//   {
//     id: "1",
//     name: "Ethernet 1",
//     status: "connected",
//     ipv4: "192.168.1.100",
//     ipv6: "fe80::1234:abcd:5678:9abc",
//     dns: ["8.8.8.8", "8.8.4.4"],
//     speedMbps: 1000,
//     type: "ethernet",
//   },
//   {
//     id: "2",
//     name: "Wi-Fi",
//     status: "connected",
//     ipv4: "192.168.1.101",
//     dns: ["1.1.1.1", "1.0.0.1"],
//     speedMbps: 300,
//     type: "wifi",
//     ssid: "Home_Network",
//   },
//   {
//     id: "3",
//     name: "Ethernet 2",
//     status: "disconnected",
//     ipv4: "",
//     dns: [],
//     type: "ethernet",
//   },
// ];

function getStatusIcon(status: NetworkAdapter["status"]) {
  if (status === "connected") {
    return <CheckCircle2 className="w-5 h-5 text-green-600" aria-label="Connected" />;
  }
  return <XCircle className="w-5 h-5 text-red-600" aria-label="Disconnected" />;
}

export function NetworkInfo() {
  const [adapters, setAdapters] = useState<NetworkAdapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        const res = await fetch("/api/stats/system/network");
        const data = await res.json();
        setAdapters(data);
      } catch (error) {
        console.error("Failed to fetch network data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkInfo();
  }, []);


  if (
    !adapters
  ) {
    return <div className="text-muted-foreground text-sm">Gathering network details...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Network Information</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Adapters & Status</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {adapters.map(
            ({ id, name, status, ipv4, ipv6, dns, speedMbps, type, ssid }) => (
              <div key={id} className="py-4 flex flex-col md:flex-row md:justify-between">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  {type === "wifi" ? (
                    <Wifi className="w-6 h-6" />
                  ) : (
                    <Monitor className="w-6 h-6" />
                  )}
                  <p className="font-semibold">{name}</p>
                  {getStatusIcon(status)}
                </div>

                {status === "connected" ? (
                  <div className="text-sm text-muted-foreground space-y-1 md:text-right">
                    <p>
                      <span className="font-medium">IPv4:</span> {ipv4}
                    </p>
                    {ipv6 && (
                      <p>
                        <span className="font-medium">IPv6:</span> {ipv6}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">DNS:</span>{" "}
                      {Array.isArray(dns) ? dns.join(", ") : dns || "N/A"}
                    </p>

                    {speedMbps && (
                      <p>
                        <span className="font-medium">Speed:</span> {speedMbps} Mbps
                      </p>
                    )}
                    {type === "wifi" && ssid && (
                      <p>
                        <span className="font-medium">SSID:</span> {ssid}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm italic text-red-600 md:text-right">Disconnected</p>
                )}
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
