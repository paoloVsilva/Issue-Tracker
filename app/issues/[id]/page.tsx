import { prisma } from '@/prisma/client'
import { Box, Flex, Grid, Separator } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import ChangeStatusButton from './ChangeStatusButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (isNaN(+id)) notFound()
  const issue = await fetchUser(parseInt(id))
  if (!issue) notFound()

  const isOpenIssue = issue.status === 'OPEN'
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction='column' gap='4'>
            {isOpenIssue && <AssigneeSelect issue={issue} />}
            {isOpenIssue && <Separator orientation='horizontal' size='4' />}
            <ChangeStatusButton status={issue.status} issueId={issue.id} />
            {isOpenIssue && <EditIssueButton issueId={issue.id} />}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const issue = await fetchUser(parseInt(id))

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage
