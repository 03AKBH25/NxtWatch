import Header from '../Header'
import Sidebar from '../Sidebar'
import styles from './MainLayout.module.css'

const MainLayout = props => {
  const {children} = props

  return (
    <div className={styles.parentCont}>
      <div className={styles.headerCont}>
        <Header />
      </div>
      <div className={styles.mainCont}>
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
