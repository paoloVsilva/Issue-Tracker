import { patchIssueSchema } from '@/app/validationSchemas'
import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import delay from 'delay'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { assignedToUserId, title, description, status } = body
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId }
    })

    if (!user)
      return NextResponse.json({ error: 'Invalid User' }, { status: 404 })
  }

  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId, status }
  })
  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })
  const { id } = await params

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  await prisma.issue.delete({ where: { id: issue.id } })

  return NextResponse.json({})
}
