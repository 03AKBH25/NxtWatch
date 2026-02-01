import styles from './NotFound.module.css'

const NotFound = () => (
  <div className={styles.mainCont}>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      className={styles.image}
      alt="Not Found"
    />
    <h1 className={styles.head}>Page Not Found</h1>
    <p className={styles.desc}>
      We are sorry,the page you requested could not be found
    </p>
  </div>
)

export default NotFound
