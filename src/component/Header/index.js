import styles from './Header.module.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Header = () => {
  onLogout = () => {}

  return (
    <div className={styles.mainCont}>
      <div className={styles.logoCont}>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" className={styles.siteLogo} alt="site-logo" />
      </div>
      <ul className={styles.optionsCont}>
        <li></li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className={styles.profile}
          />
        </li>
        <li>
          <button className={styles.logout} onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header
