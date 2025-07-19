import LatestIssues from './LatestIssues'

interface Props {
  searchParams: Promise<{ page: string }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams

  return <LatestIssues />
}
