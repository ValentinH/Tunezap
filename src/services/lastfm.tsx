import ky from 'ky'

export type Suggestion = {
  id: string
  title?: string
  artist: string
  isSong: boolean
}
export type Suggestions = {
  artists: Maybe<Suggestion[]>
  songs: Maybe<Suggestion[]>
}

type LastFmTrackImage = {
  '#text': string
  size: string
}

type LastFmTrack = {
  artist: string
  name: string
  url: string
  listeners: string
  mbid: string
  streamable: string
  image: LastFmTrackImage[]
}
type LastFmTrackResponse = {
  results?: {
    trackmatches: {
      track: LastFmTrack[]
    }
  }
}
type LastFmArtist = {
  name: string
  url: string
  listeners: string
  mbid: string
  streamable: string
  image: LastFmTrackImage[]
}
type LastFmArtistResponse = {
  results?: {
    artistmatches: {
      artist: LastFmArtist[]
    }
  }
}

const API_KEY = 'b73763e339a0fdb0af4b4386e2dd3c9a'

const getSongsSuggestions = async (
  query: string
): Promise<Maybe<Suggestion[]>> => {
  const response: LastFmTrackResponse = await ky
    .get('https://ws.audioscrobbler.com/2.0/', {
      searchParams: {
        api_key: API_KEY,
        method: 'track.search',
        format: 'json',
        page: 1,
        limit: 5,
        track: query,
      },
    })
    .json()

  return response.results
    ? response.results.trackmatches.track.map(track => ({
        id: track.mbid,
        title: track.name,
        artist: track.artist,
        isSong: true,
      }))
    : null
}

const getArtistsSuggestions = async (
  query: string
): Promise<Maybe<Suggestion[]>> => {
  const response: LastFmArtistResponse = await ky
    .get('https://ws.audioscrobbler.com/2.0/', {
      searchParams: {
        api_key: API_KEY,
        method: 'artist.search',
        format: 'json',
        page: 1,
        limit: 5,
        artist: query,
      },
    })
    .json()

  return response.results
    ? response.results.artistmatches.artist.map(artist => ({
        id: artist.mbid,
        artist: artist.name,
        isSong: false,
      }))
    : null
}

export const getSuggestions = async (query: string): Promise<Suggestions> => {
  try {
    const [songs, artists] = await Promise.all([
      getSongsSuggestions(query),
      getArtistsSuggestions(query),
    ])
    return { songs, artists }
  } catch (e) {
    console.error(e)
    return { songs: null, artists: null }
  }
}
