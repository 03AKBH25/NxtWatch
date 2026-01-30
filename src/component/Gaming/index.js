import styles from './Gaming.module.css'
import {Link} from 'react-router-dom'

const Gaming = (props = (
  <Link to={`/video/${props.id}`}>
    <div className={styles.mainCont}>
      <img src={} alt={} className={styles.image} />
      <h1 className={styles.gameName}>{}</h1>
      <p className={styles.desc}></p>
    </div>
  </Link>
))

export default Gaming
