import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'thermalInfo.ps1');
    const { stdout } = await execFileAsync('powershell', ['-File', scriptPath]);

    const data = JSON.parse(stdout);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Failed to retrieve thermal data:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve thermal data',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
