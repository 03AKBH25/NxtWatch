import {Component} from 'react'
import ThemeContext from '../../context/themse'
import Header from '../Header'

import styles from './Home.module.css'

class Home extends Component {
  state = {
    userInput:'',
    videoList:[]
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return <div className={styles.parentCont}></div>
        }}
      </ThemeContext.Consumer>
    )
  }
}
