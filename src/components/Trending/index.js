import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/themse'
import styles from './Trending.module.css'

class Trending extends Component {
  state = {
    videoList: [],
    isLoading: true,
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
          const displayTheme1 = darkTheme ? styles.dark1 : styles.light1
          const displayTheme2 = darkTheme ? styles.light2 : styles.dark2

          return (
            <div className={`${styles.parentDiv} ${displayTheme}`}>
              <div className={`${styles.titleCont} ${displayTheme1}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                  className={styles.headImg}
                  alt="trending"
                />
                <h1 className={styles.trending}>Trending</h1>
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
                      <Link to={`/videos/${video.id}`} className={styles.link}>
                        <li className={styles.item} key={video.id}>
                          <div className={styles.thumbImgCont}>
                            <img
                              src={video.thumbnailUrl}
                              className={styles.image}
                              alt="thumbnail"
                            />
                          </div>
                          <div className={styles.descCont}>
                            <h1 className={`${styles.vHead} ${displayTheme2}`}>
                              {video.title}
                            </h1>
                            <p className={`${styles.vName} ${displayTheme2}`}>
                              {video.name}
                            </p>
                            <div className={styles.viewInfo}>
                              <p
                                className={`${styles.vCount} ${displayTheme2}`}
                              >
                                {video.viewCount}
                              </p>
                              <p className={`${styles.vDate} ${displayTheme2}`}>
                                {video.publishedArt}
                              </p>
                            </div>
                          </div>
                        </li>
                      </Link>
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
