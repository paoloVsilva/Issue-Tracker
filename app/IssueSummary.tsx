import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { Status } from './generated/prisma'
import Link from 'next/link'

interface Props {
  open: number
  closed: number
}

const IssueSummary = ({ open, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' }
  ]

  return (
    <Flex gap='4'>
      {containers.map(container => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link
              href={`/issues?status=${container.status}`}
              className='font-medium text-sm'
            >
              {container.label}
            </Link>
            <Text size='5' className='font-bold'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
