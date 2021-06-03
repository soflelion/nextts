/* eslint-disable prettier/prettier */
import { GetServerSideProps, NextPage } from 'next'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}

const IndexPage: NextPage<Props> = ({ launch }) => (
  <main>
    <h1>Last 3 SpaceX launches: {launch.site}</h1>
    <p>here the list of the last 3 launches with link to a detail page please :)</p>
  </main>
)

export const getServerSideProps: GetServerSideProps = async () => {
  

  return {
    props: {
      launch: {
        mission: '107',
        site: 'oui',
        timestamp: 154,
        rocket: 'hello',
      },
    },
  }
}

export default IndexPage
