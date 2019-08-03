import { withStyles, Theme } from '@material-ui/core/styles'
import { Slider as MuiSlider } from '@material-ui/core'

const Slider = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.secondary.main,
    height: 6,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -8,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  rail: {
    height: 6,
    borderRadius: 3,
  },
}))(MuiSlider)

export default Slider
