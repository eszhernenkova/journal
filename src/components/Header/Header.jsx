import SelectUser from '../SelectUser/SelectUser'
import styles from './Header.module.scss'

function Header( { changedUser } ) {
  const changeUser = (e) => {
      changedUser(e.target.value);
      console.log(e.target.value);
  }

  return (
    <>
      <img className={styles.logo} src="/Logo.svg" alt="Логотип журнала" />
      <SelectUser changeUser={changeUser} />
      
    </>
  )
}

export default Header