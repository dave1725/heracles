import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

export async function GET() {
  const smartctlPath = path.resolve(process.cwd(), 'lib', 'smartctl.exe');
  const device = '\\\\.\\PhysicalDrive0';

  return new Promise<NextResponse>((resolve) => {
    execFile(
      smartctlPath,
      ['-a', '-j', '-q', 'errorsonly', device],
      { windowsHide: true },
      (error, stdout, stderr) => {
        if (error) {
          console.error('smartctl error:', error, stderr);
          resolve(
            NextResponse.json(
              { error: 'Failed to retrieve SMART data', details: error.message },
              { status: 500 }
            )
          );
          return;
        }

        console.log('Raw smartctl output:', stdout);

        try {
          const jsonStart = stdout.indexOf('{');
          const jsonEnd = stdout.lastIndexOf('}');
          if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error('No JSON found in smartctl output');
          }

          const jsonString = stdout.substring(jsonStart, jsonEnd + 1);
          const smartData = JSON.parse(jsonString);

          resolve(NextResponse.json(smartData));
        } catch (parseError: any) {
          console.error('JSON parse error:', parseError);
          resolve(
            NextResponse.json(
              { error: 'Failed to parse SMART data output', details: parseError.message },
              { status: 500 }
            )
          );
        }
      }
    );
  });
}
