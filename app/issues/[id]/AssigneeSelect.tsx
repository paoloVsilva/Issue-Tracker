'use client'

import { User } from '@/app/generated/prisma'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<User[]>('/api/users')
      setUsers(data)
    }
    fetchUser()
  }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content variant='soft' position='popper'>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map(user => (
            <Select.Item key={user.id} value={user.id.toString()}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
