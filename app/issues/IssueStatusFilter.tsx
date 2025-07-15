'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'
import { Status } from '../generated/prisma'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value?: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' }
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      onValueChange={status => {
        const params = new URLSearchParams()
        if (status && status !== 'ALL') params.append('status', status)
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!)
        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues' + query)
      }}
      defaultValue={searchParams.get('status') || 'ALL'}
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
