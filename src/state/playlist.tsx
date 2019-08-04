import React from 'react'

export type Song = { id: string; title: string; artist: string }
type State = { songs: Song[] }
type Action = { type: 'increment' } | { type: 'decrement' }
type Dispatch = (action: Action) => void
type PlaylistProviderProps = { children: React.ReactNode }

const PlaylistStateContext = React.createContext<State | undefined>(undefined)
const PlaylistDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

function playlistReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return { ...state }
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

function usePlaylistState() {
  const context = React.useContext(PlaylistStateContext)
  if (context === undefined) {
    throw new Error('usePlaylistState must be used within a PlaylistProvider')
  }
  return context
}

function usePlaylistDispatch() {
  const context = React.useContext(PlaylistDispatchContext)
  if (context === undefined) {
    throw new Error(
      'usePlaylistDispatch must be used within a PlaylistProvider'
    )
  }
  return context
}

function usePlaylist() {
  return [usePlaylistState(), usePlaylistDispatch()]
}

export { PlaylistProvider, usePlaylist }
