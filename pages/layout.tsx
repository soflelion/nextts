import { NextPage } from 'next'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import QUERY_LAUNCHESPAST from '../api/queryLaunchesPast.graphql'
interface Content {
  children: JSX.Element
}

interface LaunchesPast {
  id: number
  mission_name: string
}

const Layout: NextPage<Content> = ({ children }) => {
  const { data } = useQuery(QUERY_LAUNCHESPAST, { variables: { numberlast: 3 } })

  return (
    <div>
      <header>
        Menu
        {data &&
          data.launchesPast.map((launch: LaunchesPast) => (
            <div key={launch.id}>
              <Link href={'/mission/' + launch.id}>{launch.mission_name}</Link>
            </div>
          ))}
      </header>
      <div>{children}</div>
      <footer>Sofiane - Nextts</footer>
    </div>
  )
}

export default Layout
