

import './JournalForm.scss'
import Button from '../Button/Button'
import { useState } from 'react';


function JournalForm( { onSubmit } ) {

  const [ formValidState, setFormValidState ] = useState({
    title: true,
    text: true,
    date: true
  });
  
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // FormData - объект, который содержит данные всех полей формы
    const formProps = Object.fromEntries(formData); // Object.fromEntries() - преобразует объект FormData в обычный объект JavaScript, где ключами являются имена полей, а значениями — их значения

    if(!formProps.title.trim().length){
      setFormValidState(state => ({...state, title: false }));
    }

    if(!formProps.text.trim().length){
      setFormValidState(state => ({...state, text: false }));
    }

    if(!formProps.data){
      setFormValidState(state => ({...state, data: false }));
    }

    onSubmit(formProps);
    console.log(formProps);
  }



  return (
    <form className='journal-form' onSubmit={addJournalItem} >
        <input type="text" name='title' />
        <input type="date" name='date' />
        <input  type="text" name='tag' />
        <textarea name="text" id="" cols='30' rows='10' ></textarea>
        <Button text = 'Сохранить'/>
    </form>
  )
}

export default JournalForm