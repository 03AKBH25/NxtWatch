import Cookies from 'js-cookie'
import ThemeContext from '../../context/themse'
import styles from './Header.module.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme, changeTheme} = value
        const displayTheme = darkTheme ? styles.dark : styles.light

        return (
          <div className={`${styles.mainCont} ${displayTheme}`}>
            <div className={styles.logoCont}>
              <img
                src={
                  displayTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                className={styles.siteLogo}
                alt="site-logo"
              />
            </div>
            <ul className={styles.optionsCont}>
              <li onClick={changeTheme}>
                <img
                  src={
                    darkTheme
                      ? 'https://www.svgrepo.com/svg/118173/sun'
                      : 'https://www.svgrepo.com/show/416252/basic-moon-ui.svg'
                  }
                  alt="theme icon"
                  className={displayTheme}
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className={styles.profile}
                />
              </li>
              <li>
                <button
                  className={styles.logout}
                  onClick={onLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Header
