// app/api/startup-programs/route.ts

import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const scriptPath = path.resolve(process.cwd(), "scripts/startupPrograms.ps1");

    const { stdout } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File",
      scriptPath,
    ]);

    const parsed = JSON.parse(stdout);
    return NextResponse.json(parsed);

  } catch (error: unknown) {
    let message = "Unexpected error occurred";
    if(error instanceof Error){
      message = error.message;
    }
    console.error("Error reading startup programs:", message);
    return NextResponse.json(
      { error: "Failed to retrieve startup programs." },
      { status: 500 }
    );
  }
}
