import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import { Issue, Status } from '../generated/prisma'
import NextLink from 'next/link'
import { AiOutlineArrowUp } from 'react-icons/ai'

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]
  const statuses = Object.values(Status)
  const issues = await prisma.issue.findMany({
    where: {
      status: statuses.includes(params.status) ? params.status : undefined
    }
  })

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...params, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === params.orderBy ? (
                  <AiOutlineArrowUp className='inline' />
                ) : (
                  ''
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
