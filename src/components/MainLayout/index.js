import Header from '../Header'
import Sidebar from '../Sidebar'
import styles from './MainLayout.module.css'

const MainLayout = props => {
  const {children} = props

  return (
    <div className={styles.parentCont}>
      <Header />
      <div className={styles.mainCont}>
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
