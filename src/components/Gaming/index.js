import {Link} from 'react-router-dom'
import styles from './Gaming.module.css'

const Gaming = props => {
  const {id} = props

  return (
    <Link to={`/video/${id}`}>
      <div className={styles.mainCont}>
        <img src="https://" alt="ehllo" className={styles.image} />
        <h1 className={styles.gameName}>{}</h1>
        <p className={styles.desc}>Name</p>
      </div>
    </Link>
  )
}

export default Gaming
