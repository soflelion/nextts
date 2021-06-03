import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
      <div className="background">
        <video
          style={{ objectFit: 'cover', opacity: 0.4, position: 'absolute', zIndex: -1 }}
          muted
          autoPlay
          loop
          width="100%"
          height="100%"
          preload="auto"
        >
          <source type="video/mp4" src="../videos/ISS-Docking_Simulation-15sec-03-web.mp4" />
        </video>
      </div>
      <div className="page">
        <header className="page-header">
          <Link href="/">
            <a>
              <Image src="/images/logospacex.png" width="210" height="26" />
            </a>
          </Link>
          {data &&
            data.launchesPast.map((launch: LaunchesPast) => (
              <div className="bloc-mission" key={launch.id}>
                <Link href={'/mission/' + launch.id}>{launch.mission_name}</Link>
              </div>
            ))}
        </header>
        <div className="page-content">{children}</div>
        <footer className="page-footer">Sofiane - Nextts</footer>
      </div>
    </div>
  )
}

export default Layout
