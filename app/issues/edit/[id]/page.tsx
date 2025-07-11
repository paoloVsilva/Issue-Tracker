import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '@/app/issues/_components/IssueForm'

interface Props {
  params: Promise<{ id: string }>
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params
  if (isNaN(+id)) notFound()

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } })
  if (!issue) notFound()
  return <IssueForm issue={issue} />
}

export default EditIssuePage
