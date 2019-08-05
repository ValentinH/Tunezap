import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import { usePlaylistDispatch } from 'state/playlist'
import Search from './Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    iconButtons: {
      display: 'flex',
    },
  })
)

export default function Header() {
  const classes = useStyles()
  const playlistDispatch = usePlaylistDispatch()

  const onSelect = (value: string) => {
    playlistDispatch({ type: 'addSong', value })
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.row}>
          <Typography className={classes.title} variant="h6" noWrap>
            Tunezap
          </Typography>
          <Search onSelect={onSelect} />
          <div className={classes.iconButtons}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <ShareIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
