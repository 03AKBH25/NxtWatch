import styles from './Index.module.css'
import ThemeContext from '../../context/themse'

const VideoNotFound = props => {
  const {getUserVideos} = props
  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const displayTheme = darkTheme ? styles.dark : styles.light

        return (
          <div className={`${styles.parentCont} ${displayTheme}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className={styles.logo}
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button
              type="button"
              onClick={getUserVideos}
              className={styles.btn}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoNotFound
