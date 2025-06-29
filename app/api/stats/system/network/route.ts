import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  const scriptPath = path.resolve(process.cwd(), "scripts", "networkInfo.ps1");

  try {
    const { stdout } = await execAsync(
      `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`
    );
    const data = JSON.parse(stdout);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch network info", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
