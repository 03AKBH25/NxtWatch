import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import ThemeContext from './context/themse'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideo from './components/SavedVideo'
import NotFound from './components/NotFound'
import VideoDetail from './components/VideoDetail'

class App extends Component {
  state = {
    darkTheme: true,
  }

  changeTheme = () => {
    this.setState(prevState => ({
      darkTheme: !prevState.darkTheme,
    }))
  }

  render() {
    const {darkTheme} = this.state
    return (
      <BrowserRouter>
        <ThemeContext.Provider
          value={{
            darkTheme,
            changeTheme: this.changeTheme,
          }}
        >
          <Switch>
            <Route exact path='/login' component={LoginForm} />
            <ProtectedRoute
              exact
              path='/'
              component={() => (
                <MainLayout>
                  <Home />
                </MainLayout>
              )}
            />
            <ProtectedRoute
              exact
              path='/saved-video'
              component={() => (
                <MainLayout>
                  <SavedVideo />
                </MainLayout>
              )}
            />
            <ProtectedRoute
              exact
              path='/gaming'
              component={() => (
                <MainLayout>
                  <Gaming />
                </MainLayout>
              )}
            />
            <ProtectedRoute
              exact
              path='/trending'
              component={() => (
                <MainLayout>
                  <Trending />
                </MainLayout>
              )}
            />
            <ProtectedRoute
              exact
              path='/video/:id'
              component={() => (
                <MainLayout>
                  <VideoDetail />
                </MainLayout>
              )}
            />
            <Route path='/not-found' component={NotFound} />
            <Redirect to='/not-found' />
          </Switch>
        </ThemeContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
