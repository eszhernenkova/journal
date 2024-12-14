import './JournalAddButton.scss'
import CardButton from '../CardButton/CardButton'

function JournalAddButton() {
  return (
    <CardButton className='journal-add'>
      <img src="/plus.svg" alt="" />
      Новое воспоминание
      </CardButton>
  )
}

export default JournalAddButton