import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'text field is required' }, { status: 400 });
    }

    // Call the Python script
    const pythonScript = path.join(process.cwd(), 'src/app/api/text/transform.py');
    const pythonProcess = spawn('python', [pythonScript], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' }
    });

    // Send the text data to Python script via stdin
    const inputData = JSON.stringify({ text });
    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    return new Promise<Response>((resolve) => {
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('Python script error:', errorOutput);
          resolve(NextResponse.json({ error: 'Python script execution failed' }, { status: 500 }));
          return;
        }

        try {
          const result = JSON.parse(output);
          resolve(NextResponse.json(result));
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          resolve(NextResponse.json({ error: 'Invalid response from Python script' }, { status: 500 }));
        }
      });
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}