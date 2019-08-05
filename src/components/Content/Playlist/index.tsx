import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { usePlaylist, Song } from 'state/playlist'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

const Playlist: React.FC = () => {
  const classes = useStyles()
  const [playlistState, playlistDispatch] = usePlaylist()
  return (
    <div className={classes.root}>
      {playlistState.songs.map((song: Song) => (
        <p
          key={song.id}
          onClick={() => playlistDispatch({ type: 'removeSong', id: song.id })}
        >
          {song.title}
        </p>
      ))}
    </div>
  )
}

export default Playlist
