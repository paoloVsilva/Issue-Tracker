import { Box, Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='green' variant='outline'>
      <Link
        href={`/issues/edit/${issueId}`}
        className='w-full h-full inline-flex items-center justify-center'
      >
        Edit Issue
      </Link>
    </Button>
  )
}

export default EditIssueButton
