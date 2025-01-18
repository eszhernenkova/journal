import styles from './JournalAddButton.module.scss'
import CardButton from '../CardButton/CardButton'

function JournalAddButton({clearForm}) {
  return (
    <CardButton className={styles.journalAdd} onClick={clearForm} >
      <img src="/plus.svg" alt="" />
      Новое воспоминание
      </CardButton>
  )
}

export default JournalAddButton