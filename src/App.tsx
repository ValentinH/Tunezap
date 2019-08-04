import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from './components/Theme'
import Header from './components/Header'
import Content from './components/Content'
import BottomBar from './components/BottomBar'
import { PlaylistProvider } from './state/playlist'

const App: React.FC = () => {
  return (
    <Theme>
      <CssBaseline />
      <PlaylistProvider>
        <Header />
        <Content />
        <BottomBar />
      </PlaylistProvider>
    </Theme>
  )
}

export default App
