import { NextResponse } from "next/server";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    const scriptPath = path.resolve(process.cwd(), `scripts/${action}.ps1`);

    const { stdout } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", scriptPath
    ]);

    const json = JSON.parse(stdout);
    return NextResponse.json(json);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
