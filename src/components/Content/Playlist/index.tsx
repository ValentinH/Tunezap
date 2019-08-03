import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
)

const Playlist: React.FC = () => {
  const classes = useStyles()
  return <div className={classes.root}>Playlist</div>
}

export default Playlist
