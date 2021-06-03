/* eslint-disable prettier/prettier */
import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import QUERY_LAUNCHESPAST from '../api/queryLaunchesPast.graphql'
import dayjs from 'dayjs'

interface IndexPageProps {
  launches: Array<LaunchData>
}

interface LaunchData {
  id: number
  mission_name: string
  launch_date_local: string
}

const IndexPage: NextPage<IndexPageProps> = ({ launches }) =>
(
  <main>
    <h1>Last 3 SpaceX launches: </h1>
    <div>
      {launches.map((launch: LaunchData) => {
        const fromnow = dayjs(launch.launch_date_local).format('DD/MM/YYYY').toString()
        return (
          <div key={launch.id}>
            <Link href={'mission/' + launch.id}><a>{launch.mission_name} : {fromnow}</a></Link>
            <br />
          </div>
        )
      })}
    </div>
    <hr/>
  </main>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql',
    cache: new InMemoryCache(),
  });

  const denierslancement = 3;

  const { data } = await client.query({
    query: QUERY_LAUNCHESPAST,
    variables: {
      numberlast: denierslancement
    }
  });

  console.log(data.launchesPast)
  return {
    props: {
      launches: data.launchesPast,
    },
  }
}

export default IndexPage
