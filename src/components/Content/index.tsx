import React from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Playlist from './Playlist'
import Player from './Player'
import CurrentSong from './CurrentSong'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: 64,
      height: 'calc(100vh - 128px)', // whole screen minus 2x64 for top/bottom bars
      overflow: 'hidden',
    },
    side: {
      flex: 1,
      overflow: 'auto',
      padding: theme.spacing(2),
    },
    divider: {
      backgroundColor: fade(theme.palette.common.black, 0.1),
      width: 1,
      height: '100%',
    },
  })
)

const Content: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <Playlist />
        <Player />
      </div>
      <div className={classes.divider} />
      <div className={classes.side}>
        <CurrentSong />
      </div>
    </div>
  )
}

export default Content
