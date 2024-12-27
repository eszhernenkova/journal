import styles from './JournalAddButton.module.scss'
import CardButton from '../CardButton/CardButton'

function JournalAddButton() {
  return (
    <CardButton className={styles.journalAdd}>
      <img src="/plus.svg" alt="" />
      Новое воспоминание
      </CardButton>
  )
}

export default JournalAddButton