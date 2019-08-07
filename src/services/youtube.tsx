import ky from 'ky'

const API_KEY = 'AIzaSyBnhDd5dw1Dqb_gnYvGyR8dK5DaNcYPlqM'

type YoutubeSearchResponse = {
  items: Array<{
    id: { kind: string; videoId: string }
    snippet: { title: string }
  }>
}

export const getVideo = async (query: string): Promise<Maybe<string>> => {
  const response: YoutubeSearchResponse = await ky
    .get('https://www.googleapis.com/youtube/v3/search', {
      searchParams: {
        key: API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 1,
        order: 'relevance',
        type: 'video',
        videoEmbeddable: 'true',
        videoCategoryId: '10', // Music
      },
    })
    .json()
  console.log(response.items[0].snippet.title)
  return (
    (response.items && response.items[0] && response.items[0].id.videoId) ||
    null
  )
}
