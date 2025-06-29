import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
    exec('systeminfo', (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
        return;
      }
      if (stderr) {
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
        return;
      }

      const info = parseSystemInfo(stdout);
      resolve(NextResponse.json(info));
    });
  });
}

function parseSystemInfo(stdout: string) {
  const systemInfo: any = {};
  
  const lines = stdout.split('\n');
  lines.forEach(line => {
    if (line.includes(':')) {
      const [key, value] = line.split(':').map(str => str.trim());
      systemInfo[key] = value;
    }
  });

  return systemInfo;
}
