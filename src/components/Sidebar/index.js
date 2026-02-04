import {NavLink} from 'react-router-dom'
import ThemeContext from '../../context/themse'
import styles from './Sidebar.module.css'

const Sidebar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const displayTheme = darkTheme ? styles.dark : styles.light
      return (
        <div className={`${styles.parentCont} ${displayTheme}`}>
          <ul className={styles.navOptions}>
            <NavLink to="/" className={styles.navLink}>
              <img src="" className={styles.navLogo} alt="home logo" />
              <li className={styles.navOption}>Home</li>
            </NavLink>
            <NavLink to="/trending" className={styles.navLink}>
              <img src="" className={styles.navLogo} alt="trending logo" />
              <li className={styles.navOption}>Trending</li>
            </NavLink>
            <NavLink to="/gaming" className={styles.navLink}>
              <img src="" className={styles.navLogo} alt="gaming logo" />
              <li className={styles.navOption}>Gaming</li>
            </NavLink>
            <NavLink to="/saved-video" className={styles.navLink}>
              <img src="" className={styles.navLogo} alt="saved logo" />
              <li className={styles.navOption}>Saved videos</li>
            </NavLink>
          </ul>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Sidebar
