import { Box, DropdownMenu, Avatar, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Skeleton } from '@/app/components'

const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === 'loading') return <Skeleton width='3rem' />
  if (status === 'unauthenticated')
    return (
      <Link href='/api/auth/signin' className='nav-link'>
        Login
      </Link>
    )
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='end'>
          <Text size='2'>
            <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout' className='w-full'>
                Log out
              </Link>
            </DropdownMenu.Item>
          </Text>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default AuthStatus
