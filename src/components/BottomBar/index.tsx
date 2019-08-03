import React from 'react'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'
import { AppBar, IconButton, Typography } from '@material-ui/core'
import AntennaIcon from '@material-ui/icons/SettingsInputAntennaRounded'
import PreviousIcon from '@material-ui/icons/SkipPreviousRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'
import NextIcon from '@material-ui/icons/SkipNextRounded'
import ShuffleIcon from '@material-ui/icons/ShuffleRounded'
import RepeatIcon from '@material-ui/icons/RepeatRounded'
import Slider from './Slider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      borderTop: `1px solid ${theme.palette.secondary.main}`,
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    grow: {
      flexGrow: 1,
    },
    leftButtons: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
    },
    centralArea: {
      display: 'flex',
      flex: 3,
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      flex: 1,
    },
    playbackZone: {
      display: 'flex',
      flex: 3,
      justifyContent: 'space-between',
      alignItems: 'center',
      border: `1px solid ${theme.palette.common.black}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.6),
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
    slider: {
      flex: 1,
      margin: theme.spacing(0, 2),
    },
  })
)

export default function BottomBar() {
  const classes = useStyles()
  const currentTime = '0:00'
  const totalTime = '3:52'
  const [value, setValue] = React.useState<number | number[]>(30)

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue)
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <div className={classes.row}>
        <div className={classes.leftButtons}>
          <IconButton aria-label="Start Radio" color="inherit">
            <AntennaIcon />
          </IconButton>
        </div>
        <div className={classes.centralArea}>
          <div className={classes.buttons}>
            <IconButton aria-label="Previous song" color="inherit">
              <PreviousIcon />
            </IconButton>
            <IconButton aria-label="Play" color="inherit">
              <PlayIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="Next song" color="inherit">
              <NextIcon />
            </IconButton>
          </div>
          <div className={classes.playbackZone}>
            <Typography variant="caption">{currentTime}</Typography>
            <Slider
              value={value}
              onChange={handleChange}
              aria-labelledby="playback-slider"
              className={classes.slider}
            />
            <Typography variant="caption">{totalTime}</Typography>
          </div>
          <div className={classes.buttons}>
            <IconButton aria-label="Shuffle" color="inherit">
              <ShuffleIcon />
            </IconButton>
            <IconButton aria-label="Repeat all" color="inherit">
              <RepeatIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.grow} />
      </div>
    </AppBar>
  )
}
