"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

type item = {
  label: string,
  Description: string,
  Enabled: boolean,
}

export function SecurityCenter() {
  const [items, setItems] = useState<item[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:3000/api/stats/system/security").then((res)=>{
          setItems(res.data);
        })

      } catch (err: unknown) {
        let msg = "something happened";
        if(err instanceof Error) msg = err.message;
        setError(msg || "Unknown error");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Security Center</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Security Status</CardTitle>
        <p className="text-gray-500">Certain Features like RDP should be enabled only with knowledge</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm">Error: {error}</p>
          )}

          {!items && !error && (
            <p className="text-muted-foreground text-sm">Checking security status...</p>
          )}

          {items?.map((item:item,index:number) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.Description}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.Enabled ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-semibold">Enabled</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-semibold">Disabled</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
