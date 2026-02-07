import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../context/themse'
import LogoutPopup from '../LogoutPopup'
import styles from './Header.module.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value
      const displayTheme = darkTheme ? styles.dark : styles.light
      const mainTheme = darkTheme ? styles.dark1 : styles.light1

      return (
        <div className={`${styles.mainCont} ${mainTheme}`}>
          <div className={styles.logoCont}>
            <Link to="/">
              <button data-testid="theme" type="button" className={styles.link}>
                <img
                  src={
                    darkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  className={styles.siteLogo}
                  alt="website logo"
                />
              </button>
            </Link>
          </div>

          <ul className={styles.optionsCont}>
            <li onClick={changeTheme}>
              <img
                src={
                  darkTheme
                    ? 'https://cdn-icons-png.flaticon.com/512/869/869869.png'
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
              <LogoutPopup history={props.history} />
            </li>
          </ul>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
