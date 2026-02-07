import {Link} from 'react-router-dom'
import ThemeContext from '../../context/themse'
import InternetIssue from '../InternetIssue' // ADDED
import styles from './SavedVideo.module.css'

const SavedVideo = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, savedVideos} = value
      const displayTheme = darkTheme ? styles.dark : styles.light
      const displayTheme1 = darkTheme ? styles.dark1 : styles.light1

      // ADDED: internet failure check
      if (!navigator.onLine) {
        return <InternetIssue getUserVideos={() => window.location.reload()} />
      }

      return (
        <div className={`${styles.parentCont} ${displayTheme}`}>
          <div className={`${styles.titleCont} ${displayTheme1}`}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4673/4673374.png"
              className={styles.headLogo}
              alt="saved"
            />
            <h1 className={styles.mainHead}>Saved Video</h1>
          </div>
          <div className={styles.contentCont}>
            <ul className={styles.list}>
              {savedVideos.map(video => (
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
                      <p className={`${styles.vHead} ${displayTheme1}`}>
                        {video.title}
                      </p>
                      <p className={`${styles.vName} ${displayTheme1}`}>
                        {video.name}
                      </p>
                      <div className={styles.viewInfo}>
                        <p className={`${styles.vCount} ${displayTheme1}`}>
                          {video.viewCount}
                        </p>
                        <p className={`${styles.vDate} ${displayTheme1}`}>
                          {video.publishedArt}
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideo
