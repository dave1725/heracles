import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const scriptPath = path.resolve(process.cwd(), "scripts/getSecurityStatus.ps1");

    const { stdout } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", scriptPath,
    ]);

    const result = JSON.parse(stdout);
    return NextResponse.json(result);

  } catch (error: unknown) {
    let message = "Unexpected error at sec center";
    console.error("Security Center API Error:", error);
    if(error instanceof Error){
      message = error.message;
    }
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
