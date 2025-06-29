import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
    const scriptPath = path.resolve(process.cwd(), "scripts", "batteryInfo.ps1");

    exec(
      `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve(
            NextResponse.json(
              { error: error?.message || stderr || "Unknown error" },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const data = JSON.parse(stdout);
          resolve(NextResponse.json(data));
        } catch {
          resolve(
            NextResponse.json(
              { error: "Failed to parse JSON from PowerShell output" },
              { status: 500 }
            )
          );
        }
      }
    );
  });
}
