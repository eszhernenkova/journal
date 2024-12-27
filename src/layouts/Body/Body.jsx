import styles from './Body.module.scss'

function Body({ children }) {
  return (
    <div className={styles.body}>{ children }</div>
  )
}

export default Body