import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Temporary data for auuooouaaaa" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body, message: "Temp response from auuooouaaaa" });
}