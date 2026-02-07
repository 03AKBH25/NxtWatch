import styles from './InternetIssue.module.css'
import ThemeContext from '../../context/themse'

const InternetIssue = props => {
  const {getUserVideos} = props
  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const displayTheme = darkTheme ? styles.dark : styles.light

        return (
          <div className={`${styles.parentCont} ${displayTheme}`}>
            <img
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              }
              className={styles.logo}
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
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

export default InternetIssue
