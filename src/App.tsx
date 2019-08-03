import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from './components/Theme'
import Header from './components/Header'
import Content from './components/Content'
import BottomBar from './components/BottomBar'

const App: React.FC = () => {
  return (
    <Theme>
      <CssBaseline />
      <Header />
      <Content />
      <BottomBar />
    </Theme>
  )
}

export default App
