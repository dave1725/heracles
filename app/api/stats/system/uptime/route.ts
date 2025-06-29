import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const scriptPath = path.resolve(process.cwd(), "scripts", "uptime.ps1");

    const { stderr, stdout } = await execAsync(
      `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`);

    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    const data = JSON.parse(stdout);
    return NextResponse.json(data);
  }
  catch (error: unknown) {

    return NextResponse.json(
      { error: `Failed to parse JSON from PowerShell output: ${String(error)}` },
      { status: 500 }
    )
  }
}
