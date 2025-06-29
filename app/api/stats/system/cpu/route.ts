import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try{
    const scriptPath = path.resolve(process.cwd(), "scripts", "cpuUsage.ps1");

    const {stdout, stderr} = await execAsync(
      `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`);
      if(stderr) return NextResponse.json(
        {error: stderr},{status: 500}
      )
      const data = JSON.parse(stdout);
      return NextResponse.json(data);
  }
  catch(error:unknown) {
    return NextResponse.json(
      { error: `Failed to parse JSON from PowerShell output: ${String(error)}` },
      { status: 500 },
    );
  }

    //     if (error) {
    //       resolve(NextResponse.json({ error: error.message }, { status: 500 }));
    //       return;
    //     }
    //     if (stderr) {
    //       resolve(NextResponse.json({ error: stderr }, { status: 500 }));
    //       return;
    //     }

    //     try {
    //       const data = JSON.parse(stdout);
    //       resolve(NextResponse.json(data));
    //     } catch (err) {
    //       resolve(
    //         NextResponse.json(
    //           { error: "Failed to parse JSON from PowerShell output" },
    //           { status: 500 }
    //         )
    //       );
    //     }
    //   }
    // );
  // });
}
