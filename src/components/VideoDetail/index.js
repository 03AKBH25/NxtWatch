import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/themse'
import InternetIssue from '../InternetIssue' // ADDED
import styles from './VideoDetail.module.css'

class VideoDetail extends Component {
  state = {
    videoDetail: null,
    isLoading: false,
    isLiked: false,
    isDisLiked: false,
    saveVideo: false,
    isNetworkError: false, // ADDED
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
    this.setState({isLoading: true, isNetworkError: false})

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

    try {
      // ADDED
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
        throw new Error('failure')
      }
    } catch (e) {
      // ADDED
      this.setState({isLoading: false, isNetworkError: true})
    }
  }

  render() {
    const {
      videoDetail,
      isLoading,
      isDisLiked,
      isLiked,
      saveVideo,
      isNetworkError, // ADDED
    } = this.state
    const {darkTheme} = this.context
    const displayTheme = darkTheme ? styles.dark : styles.light

    if (isNetworkError) {
      // ADDED
      return <InternetIssue getUserVideos={this.getVideoDetail} />
    }

    if (videoDetail === null) {
      return null
    }

    return (
      <div className={`${styles.parentCont} ${displayTheme}`}>
        <div className={styles.videoPlayerCont}>
          {isLoading ? (
            <div className={` ${displayTheme} ${styles.loaderCont}`}>
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          ) : (
            <ReactPlayer
              url={videoDetail.videoUrl}
              controls
              playing={false}
              width="100%"
              height="100%"
            />
          )}
        </div>

        <div className={styles.descCont}>
          <h1 className={styles.descHead}>{videoDetail.title}</h1>

          <div className={styles.videoOpt}>
            <div className={styles.viewDet}>
              <p>{videoDetail.viewCount}</p>
              <p>{videoDetail.publishedAt}</p>
            </div>

            <ul className={styles.optionCont}>
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

              <li>
                <button
                  type="button"
                  className={`${styles.actionBtn} ${
                    saveVideo ? styles.active : ''
                  }`}
                  onClick={this.onClickSave}
                >
                  {saveVideo ? 'Saved' : 'Save Video'}
                </button>
              </li>
            </ul>
          </div>
          <hr className={styles.line} />
          <div className={styles.channelCont}>
            <div className={styles.channelDesc}>
              <img
                src={videoDetail.channel.profileImageUrl}
                className={styles.chLogo}
                alt="channel logo"
              />
              <div className={styles.videoDet}>
                <h1>{videoDetail.channel.name}</h1>
                <p>{videoDetail.channel.subscriberCount}</p>
              </div>
            </div>

            <p className={styles.videoDesc}>{videoDetail.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

VideoDetail.contextType = ThemeContext

export default VideoDetail
