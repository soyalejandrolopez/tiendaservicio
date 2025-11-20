import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { price, reference } = await request.json();
    
    const amountInCents = price * 100;
    const currency = 'COP';
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET || '';
    
    // Generar firma: reference + amountInCents + currency + integritySecret
    const concatenated = `${reference}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto.createHash('sha256').update(concatenated).digest('hex');
    
    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating signature' }, { status: 500 });
  }
}
