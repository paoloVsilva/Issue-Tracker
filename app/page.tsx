import { prisma } from '@/prisma/client'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

interface Props {
  searchParams: Promise<{ page: string }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  const props = { open, closed }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary {...props} />
        <IssueChart {...props} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
