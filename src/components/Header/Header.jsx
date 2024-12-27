import styles from './Header.module.scss'

function Header() {
  return (
    <img className={styles.logo} src="/Logo.svg" alt="Логотип журнала" />
  )
}

export default Header