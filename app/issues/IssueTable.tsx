import { IssueStatusBadge, Link } from '@/app/components'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Issue, Status } from '../generated/prisma'

interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface Props {
  params: IssueQuery
  issues: Issue[]
}

const IssueTable = ({ params, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink href={{ query: { ...params, orderBy: column.value } }}>
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
  )
}

const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
]

const columnNames = columns.map(column => column.value)

export { columnNames, type IssueQuery }

export default IssueTable
