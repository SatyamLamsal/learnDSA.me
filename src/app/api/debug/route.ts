import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔍 Debug API called');
    console.log('Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    });

    // Test database connection with timeout
    let userCount = 0;
    let dbStatus = 'unknown';
    
    try {
      const result = await Promise.race([
        prisma.user.count(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 5000))
      ]);
      userCount = result as number;
      dbStatus = 'connected';
      console.log('✅ Database connection successful. User count:', userCount);
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      dbStatus = dbError instanceof Error ? dbError.message : 'connection failed';
    }

    return NextResponse.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      database: dbStatus,
      userCount,
      envVars: {
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
      }
    });
  } catch (error) {
    console.error('❌ Debug API error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}