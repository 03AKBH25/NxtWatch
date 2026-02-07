import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/themse'
import VideoNotFound from '../VideoNotFound'
import InternetIssue from '../InternetIssue'

import styles from './Home.module.css'

class Home extends Component {
  state = {
    userInput: '',
    videoList: [],
    isLoading: true,
    showBanner: true,
    isFailure: false,
    isNetworkError: false, // NEW
  }

  componentDidMount() {
    this.getVideos('')
  }

  removeBanner = () => {
    this.setState({
      showBanner: false,
    })
  }

  getVideos = async searchText => {
    this.setState({
      isLoading: true,
      isFailure: false,
      isNetworkError: false,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchText}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error('Failed to fetch videos')
      }

      const fetchedData = await response.json()

      const updatedData = fetchedData.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channelName: video.channel.name,
        channelProfileUrl: video.channel.profile_image_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))

      this.setState({
        videoList: updatedData,
        isLoading: false,
        isFailure: updatedData.length === 0,
      })
    } catch (error) {
      console.error(error)
      this.setState({
        isLoading: false,
        isNetworkError: true, // INTERNET FAILURE
      })
    }
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onKeyDownInput = event => {
    if (event.key === 'Enter') {
      this.getUserList()
    }
  }

  getUserList = () => {
    const {userInput} = this.state
    this.getVideos(userInput)
  }

  renderVideos = () => {
    const {videoList, isLoading, isFailure, isNetworkError} = this.state

    if (isLoading) {
      return (
        <div className={styles.loaderCont}>
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }

    if (isNetworkError) {
      return <InternetIssue getUserVideos={this.getUserList} />
    }

    if (isFailure) {
      return <VideoNotFound getUserVideos={this.getUserList} />
    }

    return (
      <ul>
        {videoList.map(video => (
          <Link
            to={`/videos/${video.id}`}
            className={styles.link}
            key={video.id}
            name="video thumbnail"
          >
            <li>
              <div className={styles.itemCard}>
                <img
                  src={video.thumbnailUrl}
                  className={styles.itemUrl}
                  alt="video thumbnail"
                />

                <div className={styles.descContainer}>
                  <div className={styles.chImg}>
                    <img
                      src={video.channelProfileUrl}
                      className={styles.image}
                      alt="channel logo"
                    />
                  </div>

                  <div className={styles.abc}>
                    <p className={styles.title}>{video.title}</p>
                    <p className={styles.name}>{video.channelName}</p>

                    <div className={styles.videoInfo}>
                      <p className={styles.info}>{video.viewCount}</p>
                      <p className={styles.info}>{video.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const {userInput, showBanner} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const displayTheme = darkTheme ? styles.dark : styles.light

          return (
            <div className={styles.parentCont}>
              {showBanner && (
                <div
                  className={`${styles.bannerCont} ${displayTheme}`}
                  data-testid="banner"
                >
                  <div className={styles.bannerHead}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      className={styles.logo}
                      alt="nxt watch logo"
                    />

                    <button
                      type="button"
                      className={styles.btn2}
                      onClick={this.removeBanner}
                      data-testid="close"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
                        className={styles.cross}
                        alt="close banner"
                      />
                    </button>
                  </div>

                  <p className={styles.desc}>
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>

                  <button className={styles.btn} type="button">
                    GET IT NOW
                  </button>
                </div>
              )}

              <div className={`${styles.contentCont} ${displayTheme}`}>
                <div className={styles.userInputCont}>
                  <input
                    value={userInput}
                    onChange={this.onChangeInput}
                    onKeyDown={this.onKeyDownInput}
                    className={styles.userValue}
                    placeholder="Search"
                    type="search"
                  />

                  <button
                    data-testid="searchButton"
                    type="button"
                    onClick={this.getUserList}
                    className={styles.searchBtn}
                  >
                    🔍
                  </button>
                </div>

                {this.renderVideos()}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
