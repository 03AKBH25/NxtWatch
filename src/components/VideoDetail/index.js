import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/themse'
import styles from './VideoDetail.module.css'

class VideoDetail extends Component {
  state = {
    videoDetail: null,
    isLoading: false,
    isLiked: false,
    isDisLiked: false,
    saveVideo: false,
  }

  componentDidMount() {
    this.getVideoDetail()
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  onClickSave = () => {
    this.setState(
      prevState => ({saveVideo: !prevState.saveVideo}),
      () => {
        const {saveVideo, videoDetail} = this.state
        const {addSavedVideo, removeSavedVideo} = this.context

        if (saveVideo) {
          addSavedVideo(videoDetail)
        } else {
          removeSavedVideo(videoDetail.id)
        }
      },
    )
  }

  getVideoDetail = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const video = fetchedData.video_details

      const updatedData = {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        description: video.description,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
          subscriberCount: video.channel.subscriber_count,
        },
      }

      this.setState({
        videoDetail: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  render() {
    const {videoDetail, isLoading, isDisLiked, isLiked, saveVideo} = this.state
    const {darkTheme} = this.context
    const displayTheme = darkTheme ? styles.dark : styles.light

    if (isLoading || videoDetail === null) {
      return <Loader />
    }

    return (
      <div className={`${styles.parentCont} ${displayTheme}`}>
        <div className={styles.videoPlayerCont}>
          <h1>Video Screen</h1>
        </div>

        <div className={styles.descCont}>
          <h1>{videoDetail.title}</h1>

          <div>
            <div>
              <p>{videoDetail.viewCount}</p>
              <p>{videoDetail.publishedAt}</p>
            </div>

            <ul>
              <li
                className={`${styles.actionBtn} ${
                  isLiked ? styles.active : ''
                }`}
                onClick={this.onClickLike}
              >
                Like
              </li>

              <li
                className={`${styles.actionBtn} ${
                  isDisLiked ? styles.active : ''
                }`}
                onClick={this.onClickDislike}
              >
                Dislike
              </li>

              <li
                className={`${styles.actionBtn} ${
                  saveVideo ? styles.active : ''
                }`}
                onClick={this.onClickSave}
              >
                {saveVideo ? 'Saved' : 'Save Video'}
              </li>
            </ul>
          </div>

          <div>
            <div>
              <img
                src={videoDetail.channel.profileImageUrl}
                className={styles.chLogo}
                alt="channel logo"
              />
              <div>
                <h1>{videoDetail.channel.name}</h1>
                <p>{videoDetail.channel.subscriberCount}</p>
              </div>
            </div>

            <div>
              <p>{videoDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

VideoDetail.contextType = ThemeContext

export default VideoDetail
