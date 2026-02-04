import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/themse'
import styles from './Trending.module.css'

class Trending extends Component {
  state = {
    videoList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        name: video.channel.name,
        profileImgUrl: video.channel.profile_image_url,
        viewCount: video.view_count,
        publishedArt: video.published_art,
      }))
      this.setState({
        videoList: updatedData,
        isLoading: false,
      })
    }
  }

  render() {
    const {videoList, isLoading} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const displayTheme = darkTheme ? styles.dark : styles.light

          return (
            <div className={`${styles.parentDiv} ${displayTheme}`}>
              <div className={styles.titleCont}>
                <img src="" className={styles.headImg} alt="trending" />
                <h1>Trending</h1>
              </div>
              <div className={styles.contentCont}>
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
                  <ul className={styles.list}>
                    {videoList.map(video => (
                      <li className={styles.item}>
                        <Link to={`/video/${video.id}`} key={video.id}>
                          <div className={styles.thumbImgCont}>
                            <img
                              src={video.thumbnailUrl}
                              className={styles.img}
                              alt="thumbnail"
                            />
                          </div>
                          <div className={styles.descCont}>
                            <h1>{video.title}</h1>
                            <p>{video.name}</p>
                            <div>
                              <p>{video.viewCount}</p>
                              <p>{video.publishedArt}</p>
                            </div>
                          </div>
                        </Link>
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

export default Trending
