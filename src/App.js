import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import ThemeContext from './context/themse'
import MainLayout from './components/MainLayout'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideo from './components/SavedVideo'
import NotFound from './components/NotFound'
import VideoDetail from './components/VideoDetail'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = {
    darkTheme: false,
    savedVideos: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({
      darkTheme: !prevState.darkTheme,
    }))
  }

  addSavedVideo = video => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, video],
    }))
  }

  removeSavedVideo = id => {
    this.setState(prevState => ({
      savedVideos: prevState.savedVideos.filter(each => each.id !== id),
    }))
  }

  render() {
    const {darkTheme, savedVideos} = this.state
    return (
      <BrowserRouter>
        <ThemeContext.Provider
          value={{
            darkTheme,
            changeTheme: this.changeTheme,
            savedVideos,
            addSavedVideo: this.addSavedVideo,
            removeSavedVideo: this.removeSavedVideo,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />

            <ProtectedRoute
              path="/"
              component={() => (
                <MainLayout>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/gaming" component={Gaming} />
                    <Route exact path="/trending" component={Trending} />
                    <Route exact path="/saved-video" component={SavedVideo} />
                    <Route exact path="/video/:id" component={VideoDetail} />
                  </Switch>
                </MainLayout>
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ThemeContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
