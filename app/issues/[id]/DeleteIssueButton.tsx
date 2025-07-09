import { Button } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return <Button color='red'>Delete Issue</Button>
}

export default DeleteIssueButton
