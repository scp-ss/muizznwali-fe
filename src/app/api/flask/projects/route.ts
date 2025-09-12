import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Temporary data for flask/projects" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body, message: "Temp response from flask/projects" });
}