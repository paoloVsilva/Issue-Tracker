import NextLink from 'next/link'
import { Text } from '@radix-ui/themes'

interface Props {
  href: string
  children: string
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href}>
      <Text className='text-violet-600 hover:underline '>{children}</Text>
    </NextLink>
  )
}

export default Link
