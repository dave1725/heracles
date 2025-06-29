import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  try {
    const { acValue, dcValue } = await req.json();

    if (
      typeof acValue !== 'number' ||
      typeof dcValue !== 'number' ||
      acValue < 0 ||
      acValue > 100 ||
      dcValue < 0 ||
      dcValue > 100
    ) {
      return NextResponse.json({ error: 'Invalid input values' }, { status: 400 });
    }

    const scriptPath = path.join(process.cwd(), 'scripts', 'setCpuPowerState.ps1');

    const { stdout } = await execFileAsync(
      'powershell.exe',
      [
        '-ExecutionPolicy',
        'Bypass',
        '-File',
        scriptPath,
        '-ac',
        acValue.toString(),
        '-dc',
        dcValue.toString(),
      ],
      { windowsHide: true }
    );

    return NextResponse.json({ success: true, message: stdout.trim() });
  } catch (err: any) {
    console.error('PowerShell Error:', err);
    return NextResponse.json(
      { error: 'Failed to set CPU power state', detail: err.message },
      { status: 500 }
    );
  }
}
