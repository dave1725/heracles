import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export async function GET() {
  try {
    const {stderr, stdout} = await execAsync('systeminfo');

      if (stderr) {
        return NextResponse.json({ error: stderr }, { status: 500 });
      }

      const info = parseSystemInfo(stdout);
      return NextResponse.json(info);
  }
  catch (error:unknown){
    return NextResponse.json(
      { message: `failed to retrieve info: ${String(error)}`},
      { status: 500}
    );
  }
}

function parseSystemInfo(stdout: string) {
  const systemInfo: Record<string, unknown> = {};
  
  const lines = stdout.split('\n');
  lines.forEach(line => {
    if (line.includes(':')) {
      const [key, value] = line.split(':').map(str => str.trim());
      systemInfo[key] = value;
    }
  });

  return systemInfo;
}
