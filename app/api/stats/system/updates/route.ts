import { NextResponse } from "next/server";
import { promisify } from "util";
import { execFile } from "child_process";
import path from "path";

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const scriptPath = path.resolve(process.cwd(), "scripts/getWindowsUpdates.ps1");
    const { stdout } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", scriptPath,
    ]);

    const data = JSON.parse(stdout);
    return NextResponse.json(data);
  } catch (error: unknown) {
    let message = "Unexpected error occurred";
    if(error instanceof Error){
      message = error.message;
    }
    console.error("Error fetching Windows updates:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
