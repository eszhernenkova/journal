import styles from './SelectUser.module.scss';

function SelectUser({ changedUser }) {
    const changeUser = (e) => {
        changedUser(e.target.value);
        console.log(e.target.value);
    }

  return (
    <select className={styles.select} name="user" id="user" onChange={changeUser} >
        <option value="1">Антон</option>
        <option value="2">Вася</option>
    </select>
  )
}

export default SelectUser