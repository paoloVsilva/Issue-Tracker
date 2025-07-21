import { Pagination } from '@/app/components'
import { prisma } from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { Status } from '../generated/prisma'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Metadata } from 'next'

interface Props {
  searchParams: Promise<IssueQuery>
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const statuses = Object.values(Status)
  const status = statuses.includes(params.status) ? params.status : undefined
  const where = { status }
  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: 'asc' }
    : undefined
  const page = parseInt(params.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable params={params} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}

export default IssuesPage
