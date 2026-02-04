import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/themse'
import styles from './Gaming.module.css'

class Gaming extends Component {
  state = {
    gameList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getGameList()
  }

  getGameList = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(games => ({
        id: games.id,
        title: games.title,
        thumbnailUrl: games.thumbnail_url,
        viewCount: games.view_count,
      }))
      this.setState({
        gameList: updatedData,
        isLoading: false,
      })
    }
  }

  render() {
    const {gameList, isLoading} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const displayTheme1 = darkTheme ? styles.dark1 : styles.light1
          const displayTheme2 = darkTheme ? styles.dark : styles.light

          return (
            <div className={styles.parentCont}>
              <div className={`${styles.headCont} ${displayTheme1}`}>
                <img src="" className={styles.gameIcon} alt="game icon" />
                <h1 className={styles.gameHead}>Gaming</h1>
              </div>
              <div className={`${styles.contentCont} ${displayTheme2}`}>
                {isLoading ? (
                  <div>
                    <Loader
                      type="ThreeDots"
                      color="#0b69ff"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <ul className={styles.gameList}>
                    {gameList.map(games => (
                      <Link to={`/video/${games.id}`} key={games.id}>
                        <li className={styles.item}>
                          <img
                            src={games.thumbnailUrl}
                            className={styles.gameImg}
                            alt="game"
                          />
                          <h1 className={styles.gameHead}>{games.title}</h1>
                          <p className={styles.gameView}>{games.viewCount}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
