import React from 'react'
import YouTube, { Options } from 'react-youtube'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { usePlaylist, Song } from 'state/playlist'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

const Playlist: React.FC = () => {
  const classes = useStyles()
  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <YouTube
      videoId="2g811Eo7K8U"
      opts={opts}
      //   onReady={this._onReady}
    />
  )
}

export default Playlist
