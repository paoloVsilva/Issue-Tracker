import { NextRequest, NextResponse } from 'next/server'
import { issueStatusSchema } from '@/app/validationSchemas'
import { prisma } from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })
  const body = await request.json()
  const validation = issueStatusSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { status: body.status }
  })
  return NextResponse.json(updatedIssue)
}
