import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { lastVisited: 'desc' }
    })

    return NextResponse.json(progress)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { topicId, topicType, category, completed, timeSpent } = await request.json()

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId
        }
      },
      update: {
        completed,
        timeSpent: { increment: timeSpent || 0 },
        lastVisited: new Date()
      },
      create: {
        userId: session.user.id,
        topicId,
        topicType,
        category,
        completed: completed || false,
        timeSpent: timeSpent || 0
      }
    })

    return NextResponse.json(progress)
  } catch {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}