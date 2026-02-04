import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/themse'

import styles from './Home.module.css'

class Home extends Component {
  state = {
    userInput: '',
    videoList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/all?search='

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
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
      })
    }
  }

  render() {
    const {videoList, userInput, isLoading} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const displayTheme = darkTheme ? styles.dark : styles.light

          return (
            <div className={styles.parentCont}>
              {/* Banner Section */}
              <div className={`${styles.bannerCont} ${displayTheme}`}>
                <div className={styles.bannerHead}>
                  <img
                    src={
                      darkTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    className={styles.logo}
                    alt="logo"
                  />
                  <img src="" className={styles.cross} alt="cross" />
                </div>

                <p className={styles.desc}>
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>

                <button className={styles.btn} type="button">
                  GET IT NOW
                </button>
              </div>

              {/* Content Section */}
              <div className={`${styles.contentCont} ${displayTheme}`}>
                <input value={userInput} />

                {isLoading ? (
                  <div>
                    <Loader
                      type="ThreeDots"
                      color="#0b69ff"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <ul>
                    {videoList.map(video => (
                      <li key={video.id}>
                        <div className={styles.itemCard}>
                          <img
                            src={video.thumbnailUrl}
                            className={styles.itemUrl}
                            alt="thumbnail"
                          />

                          <div className={styles.descContainer}>
                            <div className={styles.chImg}>
                              <img
                                src={video.channelProfileUrl}
                                className={styles.image}
                                alt="channel pic"
                              />
                            </div>
                            <div className={styles.abc}>
                              <h1 className={styles.title}>{video.title}</h1>
                              <h1 className={styles.name}>
                                {video.channelName}
                              </h1>

                              <div className={styles.videoInfo}>
                                <h1 className={styles.info}>
                                  {video.viewCount}
                                </h1>
                                <h1 className={styles.info}>
                                  {video.publishedAt}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
