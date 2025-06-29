import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, path: programPath, source, location, enable } = body;

    console.log("Toggle request:", name, enable);

    const scriptPath = path.resolve(process.cwd(), "scripts/toggleStartupProgram.ps1");

    const { stdout, stderr } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File",
      scriptPath,
      "-Path", programPath,
      "-Name", name,
      "-Source", source,
      "-Location", location,
      "-Enable", enable.toString() // ✅ "True" or "False"
    ]);

    console.log("stdout:", stdout);
    console.log("stderr:", stderr);

    const parsed = JSON.parse(stdout);
    return NextResponse.json(parsed);

  } catch (error: unknown) {
    let message = "Unexpected error occurred";
    if(error instanceof Error){
      message = error.message;
    }
    console.error("Toggle API Error:", message);
    return NextResponse.json(
      { success: false, error: message || "Unknown error" },
      { status: 500 }
    );
  }
}
