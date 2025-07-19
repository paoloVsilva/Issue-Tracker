import { prisma } from '@/prisma/client'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

interface Props {
  searchParams: Promise<{ page: string }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return <IssueSummary open={open} closed={closed} />
}
