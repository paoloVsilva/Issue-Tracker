import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='green' variant='outline'>
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton
