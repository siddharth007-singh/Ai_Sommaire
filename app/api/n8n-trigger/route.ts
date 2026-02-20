import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ye Server-to-Server call hai, isme CORS error nahi aayega
    const response = await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, body);
    
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to trigger n8n' }, 
      { status: 500 }
    );
  }
}