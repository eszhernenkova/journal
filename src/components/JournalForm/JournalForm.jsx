import { useState } from 'react';

import './JournalForm.scss'
import Button from '../Button/Button'


function JournalForm() {
    const [ inputData, setIinputData ] = useState('');
  
    const inputChange = (event) => {
        setIinputData(event.target.value);
    }

    const addJournalItem = (e) => {
        const formData = new FormData(e.target); // FormData - объект, который содержит данные всех полей формы
        const formProps = Object.fromEntries(formData); // Object.fromEntries() - преобразует объект FormData в обычный объект JavaScript, где ключами являются имена полей, а значениями — их значения
        e.preventDefault();
        console.log(formProps)
    }



  return (
    <form className='journal-form' onSubmit={addJournalItem} >
        <input type="text" name='title' />
        <input type="date" name='date' />
        <input 
          type="text" 
          name='tag'
          onChange={inputChange}
          value={inputData}
        />
        <textarea name="post" id="" cols='30' rows='10' ></textarea>
        <Button text = 'Сохранить'/>
    </form>
  )
}

export default JournalForm