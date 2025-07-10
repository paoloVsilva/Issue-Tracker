import { Status } from '@/app/generated/prisma'
import { Button } from '@radix-ui/themes'

const ChangeStatusButton = ({ status }: { status: Status }) => {
  if (status === 'CLOSED') return <Button color='red'>Re-open Issue</Button>

  return <Button color='green'>Close Issue</Button>
}

export default ChangeStatusButton
