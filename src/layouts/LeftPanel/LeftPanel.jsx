import styles from './LeftPanel.module.scss';

function LeftPanel({ children }) {
  return (
    <div className={styles.leftPanel}>{ children }</div>
  )
}

export default LeftPanel