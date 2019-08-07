import React from 'react'
import * as youtube from 'services/youtube'

export type Song = {
  id: number
  title: string
  videoId: Maybe<string>
}

type State = { songs: Song[] }
type Action =
  | { type: 'addSong'; value: string; videoId: Maybe<string> }
  | { type: 'removeSong'; id: number }
type Dispatch = (action: Action) => void
type PlaylistProviderProps = { children: React.ReactNode }

const PlaylistStateContext = React.createContext<State | undefined>(undefined)
const PlaylistDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

let playlistId = 0

function playlistReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addSong': {
      return {
        ...state,
        songs: [
          ...state.songs,
          {
            title: action.value,
            videoId: action.videoId,
            id: playlistId++,
          },
        ],
      }
    }
    case 'removeSong': {
      return {
        ...state,
        songs: state.songs.filter(song => song.id !== action.id),
      }
    }
    default: {
      throw new Error(`Unhandled action: ${action}`)
    }
  }
}

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const [state, dispatch] = React.useReducer(playlistReducer, { songs: [] })
  return (
    <PlaylistStateContext.Provider value={state}>
      <PlaylistDispatchContext.Provider value={dispatch}>
        {children}
      </PlaylistDispatchContext.Provider>
    </PlaylistStateContext.Provider>
  )
}

export function usePlaylistState() {
  const context = React.useContext(PlaylistStateContext)
  if (context === undefined) {
    throw new Error('usePlaylistState must be used within a PlaylistProvider')
  }
  return context
}

export function usePlaylistDispatch() {
  const context = React.useContext(PlaylistDispatchContext)
  if (context === undefined) {
    throw new Error(
      'usePlaylistDispatch must be used within a PlaylistProvider'
    )
  }
  return context
}

export function usePlaylistActions() {
  const dispatch = usePlaylistDispatch()
  return {
    addSong: addSong(dispatch),
  }
}

export function usePlaylist(): [State, Dispatch] {
  return [usePlaylistState(), usePlaylistDispatch()]
}

const addSong = (dispatch: Dispatch) => async (value: string) => {
  const videoId = await youtube.getVideo(value)
  dispatch({ type: 'addSong', value, videoId })
}
