import {NavLink} from 'react-router-dom'
import ThemeContext from '../../context/themse'
import styles from './Sidebar.module.css'

const Sidebar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const displayTheme = darkTheme ? styles.dark : styles.light
      const displayTheme1 = darkTheme ? styles.dark1 : ''
      return (
        <div className={`${styles.parentCont} ${displayTheme}`}>
          <ul className={styles.navOptions}>
            <NavLink to="/" className={styles.navLink}>
              <div className={`${displayTheme1}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                  className={`${styles.navLogo}`}
                  alt="home logo"
                />
              </div>
              <li className={`${styles.navOption} ${displayTheme}`}>Home</li>
            </NavLink>
            <NavLink to="/trending" className={styles.navLink}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                className={styles.navLogo}
                alt="trending logo"
              />
              <li className={`${styles.navOption} ${displayTheme}`}>
                Trending
              </li>
            </NavLink>
            <NavLink to="/gaming" className={styles.navLink}>
              <div className={`${displayTheme1}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/686/686589.png"
                  className={`${styles.navLogo}`}
                  alt="gaming logo"
                />
              </div>
              <li className={`${styles.navOption} ${displayTheme}`}>Gaming</li>
            </NavLink>
            <NavLink to="/saved-video" className={styles.navLink}>
              <div className={`${displayTheme1}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5662/5662990.png"
                  className={`${styles.navLogo}`}
                  alt="saved logo"
                />
              </div>
              <li className={`${styles.navOption} ${displayTheme}`}>
                Saved videos
              </li>
            </NavLink>
          </ul>
          <ul className={styles.contactCont}>
            <p className={styles.contactHead}>CONTACT US</p>
            <div className={styles.contactOptions}>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  className={styles.contactItemLogo}
                  alt="facebook logo"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  className={styles.contactItemLogo}
                  alt="twitter logo"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  className={styles.contactItemLogo}
                  alt="linkedin logo"
                />
              </li>
            </div>
            <p className={styles.contactDesc}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </ul>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Sidebar
