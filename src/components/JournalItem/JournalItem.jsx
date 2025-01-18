import styles from './JournalItem.module.scss';

function JournalItem( { title, text, date } ){

const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);


  return (
    <div className={styles.item}>
      <h2 className={styles.header}>{title}</h2>
      <h2 className={styles.body}>
          <div className={styles.date}>{formatedDate}</div>
          <div className={styles.text}>{text}</div>
      </h2>
    </div>
  )
}

export default JournalItem