import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function GET() {
  const scriptPath = path.resolve(process.cwd(), 'scripts/getStats.ps1');

  return new Promise((resolve) => {
    exec(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Script error:', stderr);
        resolve(NextResponse.json({ error: 'Script failed' }, { status: 500 }));
        return;
      }

      try {
        const data = JSON.parse(stdout);
        resolve(NextResponse.json(data));
      } catch {
        resolve(NextResponse.json({ error: 'Failed to parse JSON' }, { status: 500 }));
      }
    });
  });
}
