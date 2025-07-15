import { Select } from '@radix-ui/themes'
import React from 'react'
import { Status } from '../generated/prisma'

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' }
]

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content position='popper'>
        {statuses.map(status => (
          <Select.Item key={status.label} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
