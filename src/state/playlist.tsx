import React from 'react'

export type Song = { id: number; title: string }
type State = { songs: Song[] }
type Action =
  | { type: 'addSong'; value: string }
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

function PlaylistProvider({ children }: PlaylistProviderProps) {
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

function usePlaylist(): [State, Dispatch] {
  return [usePlaylistState(), usePlaylistDispatch()]
}

export { PlaylistProvider, usePlaylist }
