'use client'

import { Status } from '@/app/generated/prisma'
import { AlertDialog, Button, Spinner, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ChangeStatusButton = ({
  status,
  issueId
}: {
  status: Status
  issueId: number
}) => {
  const router = useRouter()
  const [isUpdating, setUpdating] = useState(false)
  const [error, setError] = useState(false)
  const updateStatus = async () => {
    try {
      setUpdating(true)
      await axios.patch('/api/issues/' + issueId, {
        status: status === 'OPEN' ? 'CLOSED' : 'OPEN'
      })
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setError(true)
      setUpdating(false)
    }
  }

  const isOpenIssue = status === 'OPEN'
  const buttonText = isOpenIssue ? 'Close issue' : 'Re-open issue'
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color={isOpenIssue ? 'green' : 'red'} disabled={isUpdating}>
            {buttonText}
            {isUpdating && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Action</AlertDialog.Title>
          <AlertDialog.Description>
            {`Are you sure you want to ${
              isOpenIssue ? 'CLOSE' : 'OPEN'
            } this issue? This action cannot be
            undone.`}
          </AlertDialog.Description>
          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={updateStatus}>
                {buttonText}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be update status.
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default ChangeStatusButton
