import { NextResponse } from 'next/server';
import path from 'path';
import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

export async function GET() {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'getCpuPowerState.ps1');
    const command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`;

    const { stdout } = await exec(command);

    try {
      const result = JSON.parse(stdout);
      return NextResponse.json(result);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON response from PowerShell script.', rawOutput: stdout },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve CPU power state.' },
      { status: 500 }
    );
  }
}
