import { ApolloClient, InMemoryCache } from '@apollo/client'
import QUERY_LAUNCHES from '../../api/queryLaunches.graphql'
import QUERY_LAUNCHESPAST from '../../api/queryLaunchesPast.graphql'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import dayjs from 'dayjs'
interface MissionProps {
  launch: LaunchData
}

interface LaunchData {
  launch_date_local: string
  id: number
  mission_name: string
  details: string
  links: {
    flickr_images: string
    mission_patch: string
    video_link: string
  }
  launch_site: {
    site_name: string
    site_name_long: string
  }
  rocket: {
    rocket_name: string
  }
}

const Mission: NextPage<MissionProps> = ({ launch }) => {
  return (
    <>
      <div>
        {launch && (
          <div key={launch.id}>
            <h1>{launch.mission_name}</h1>
            {launch.links.flickr_images[0] && (
              <Image src={launch.links.flickr_images[0]} width="200" height="auto" />
            )}
            <br />
            Date : <b>{dayjs(launch.launch_date_local).format('DD/MM/YYYY hh:mm').toString()}</b>
            <br />
            Site : <b>{launch.launch_site.site_name_long}</b>
            <br />
            Rocket : <b>{launch.rocket.rocket_name}</b>
            <p>{launch.details}</p>
            <ReactPlayer url={launch.links.video_link} />
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql',
    cache: new InMemoryCache(),
  })

  const denierslancement = 3

  const { data } = await client.query({
    query: QUERY_LAUNCHESPAST,
    variables: {
      numberlast: denierslancement,
    },
  })

  interface LaunchPast {
    id: number
    mission_name: string
    launch_date_local: string
  }

  return {
    paths: data.launchesPast.map((mission: LaunchPast) => ({
      params: {
        id: mission.id,
      },
    })),
    fallback: true,
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams // no longer causes error

  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql',
    cache: new InMemoryCache(),
  })

  const { data } = await client.query({
    query: QUERY_LAUNCHES,
    variables: {
      idmission: id,
    },
  })

  return {
    props: {
      launch: data.launch,
    },
    revalidate: 1800,
  }
}

export default Mission
