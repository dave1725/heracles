"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";

type program = {
  Name: string;
  Path: string;
  Source: string;
  Location: string;
  Enabled: boolean;
  Publisher?: string;
};


export function StartupPrograms() {
const [programs, setPrograms] = useState<program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const isEnabled = (app: any): boolean => {
  //   if (app.source.includes("Startup Folder")) {
  //     return !app.path.endsWith(".disabled");
  //   }
  //   return true; // Registry items assumed enabled if present
  // };

  const fetchStartupPrograms = async () => {
  try {
    setLoading(true);

    const res = await axios.get("http://localhost:3000/api/stats/system/startup");
    console.log("Startup Programs:", res.data);
    setPrograms(res.data);

  } catch (err: unknown) {
    if (
    typeof err === "object" &&
    err !== null &&
    "response" in err
  ) {
    const axiosErr = err as { response: { status: number; }; message: string };
    
    console.error("Axios Error:", {
      status: axiosErr.response.status,
      message: axiosErr.message,
    });
  } else {
    console.error("Unknown error type:", err);
  }

    alert("Could not load startup programs.\n");
  } finally {
    setLoading(false);
  }
};


//   const handleToggle = async (app: program, newState: boolean) => {
//     try {
//       console.log(newState);
//       const res = await axios.post("http://localhost:3000/api/stats/system/startup/disable", {
//         name: app.Name,
//         path: app.Path,
//         source: app.Source,
//         location: app.Location,
//         enable: newState,
//       });

//       if (res.data.success) {
//         setPrograms((prev: program[]) =>
//   prev.map((p: program) =>
//     p.Name === app.Name && p.Location === app.Location
//       ? { ...p, Enabled: newState }
//       : p
//   )
// );

//       } else {
//         alert("Failed to toggle item: " + res.data.error);
//       }
//     } catch (err) {
//       console.error("Toggle failed", err);
//       alert("An error occurred while toggling the startup program.");
//     }
//   };

  useEffect(() => {
    fetchStartupPrograms();
  }, []);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Startup Programs</h2> */}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <Card className="shadow-md rounded-2xl border">
  <CardHeader>
    <CardTitle className="text-xl font-bold">Startup Program Manager ({programs.length})</CardTitle>
    <p className="text-sm text-muted-foreground mt-1">
      Toggle startup programs that launch when your system boots.
    </p>
  </CardHeader>

  <CardContent className="space-y-6 px-6 py-6">
  {programs.length === 0 ? (
    <p className="text-muted-foreground py-6 text-center text-base">
      No startup programs found.
    </p>
  ) : (
    programs.map((app: program, index: number) => (
      <div
        key={index}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{app.Name}</h3>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                app.Enabled
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {app.Enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="text-sm text-muted-foreground space-y-1.5">
            {app.Publisher && (
              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {app.Publisher}
              </p>
            )}
            <p>
              <span className="font-semibold">Source:</span>{" "}
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  app.Source.includes("Registry")
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {app.Source}
              </span>
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              <code className="text-xs break-all">{app.Location}</code>
            </p>
          </div>
        </div>

        {/* Uncomment if needed */}
        {/* <div className="pt-2 md:pt-0">
          <Switch
            checked={app.Enabled}
            onCheckedChange={(val) => handleToggle(app, val)}
            aria-label={`Toggle ${app.Name}`}
          />
        </div> */}
      </div>
    ))
  )}
</CardContent>

</Card>

      )}
    </div>
  );
}
