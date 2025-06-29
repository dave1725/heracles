import { NextResponse } from "next/server";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    const scriptPath = path.resolve(process.cwd(), `scripts/${action}.ps1`);

    const { stdout, stderr } = await execFileAsync("powershell", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", scriptPath
    ]);
    console.log(stdout);
    if(stderr) return NextResponse.json(
      {message: stderr},
      {status:500}
    )

    const json = JSON.parse(stdout);
    return NextResponse.json(json);
    
  } catch (error: unknown) {
    let message = "Unexpected error occurred";
    if(error instanceof Error){
      message = error.message;
    }
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
