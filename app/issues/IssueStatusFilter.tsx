'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'
import { Status } from '../generated/prisma'
import { useRouter } from 'next/navigation'

const statuses: { label: string; value?: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' }
]

const IssueStatusFilter = () => {
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={status => {
        const query = status && status !== 'ALL' ? `?status=${status}` : ''
        router.push('/issues' + query)
      }}
    >
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
