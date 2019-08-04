import React from 'react'
import Autosuggest from 'react-autosuggest'
import { useDebouncedCallback } from 'use-debounce'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { InputBase, MenuItem, CircularProgress, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { getSuggestions, Suggestion } from 'services/lastfm'
import classes from '*.module.sass'

type SuggestionsSection = { title: string; suggestions: Suggestion[] }
type Suggestions = SuggestionsSection[]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        flex: 1,
        maxWidth: 600,
      },
    },
    search: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
    },
    spinner: {
      marginRight: theme.spacing(2),
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    sectionTitle: {
      padding: theme.spacing(0, 1),
      background: theme.palette.secondary.main,
      fontWeight: 'bold',
      color: theme.palette.common.black,
    },
  })
)

const renderInputComponent = (inputProps: any) => {
  const { classes, ref, isSearching, ...other } = inputProps
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Enter an artist or a song to add to the playlist"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        innerRef={ref}
        {...other}
      />
      {isSearching && (
        <CircularProgress
          color="secondary"
          size={20}
          thickness={4}
          className={classes.spinner}
        />
      )}
    </div>
  )
}

const renderSectionTitle = ({ section, classes }: any) => (
  <div className={classes.sectionTitle}>{section.title}</div>
)

const renderSectionContainer = ({
  section,
  children,
}: {
  classes: object
  section: SuggestionsSection
  children: React.ReactNode
}) => {
  return <section key={section.title}>{children}</section>
}

const renderSuggestion = (
  suggestion: Suggestion,
  { query, isHighlighted }: Autosuggest.RenderSuggestionParams
) => {
  return (
    <MenuItem selected={isHighlighted} dense component="div">
      {suggestion.isSong
        ? `${suggestion.title} - ${suggestion.artist}`
        : suggestion.artist}
    </MenuItem>
  )
}

const getSuggestionValue = (suggestion: Suggestion) => {
  return suggestion.isSong
    ? `${suggestion.title} - ${suggestion.artist}`
    : suggestion.artist
}

export default function Search() {
  const classes = useStyles()
  const [input, setInput] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<Suggestions>([])
  const [isSearching, setIsSearching] = React.useState(false)
  const [lastSearch, setLastSearch] = React.useState(null)

  const [fetchSuggestions] = useDebouncedCallback(async (value: any) => {
    setIsSearching(true)
    const { artists, songs } = await getSuggestions(value)
    const suggestions: Suggestions = []
    if (songs) {
      suggestions.push({ title: 'Songs', suggestions: songs })
    }
    if (artists) {
      suggestions.push({ title: 'Artists', suggestions: artists })
    }
    setSuggestions(suggestions)
    setIsSearching(false)
  }, 300)

  const handleSuggestionsFetchRequested = ({ value }: any) => {
    if (value !== lastSearch) {
      fetchSuggestions(value)
      setLastSearch(value)
    }
  }

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setInput(newValue)
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: () => {},
    getSuggestionValue,
    renderSuggestion,
    renderSectionTitle: (section: SuggestionsSection) =>
      renderSectionTitle({ section, classes }),
    renderSectionContainer,
    getSectionSuggestions: (section: SuggestionsSection) => section.suggestions,
  }

  return (
    // @ts-ignore typings seem to be wrong with multiSection
    <Autosuggest
      {...autosuggestProps}
      multiSection
      inputProps={{
        classes,
        id: 'search-input',
        placeholder: 'Enter an artist name or a song to add to the playlist',
        value: input,
        onChange: handleChange,
        isSearching,
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        // suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  )
}
