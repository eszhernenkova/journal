import styles from  './JournalForm.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import classNames from 'classnames'; //библиотека для упрощения выражений с тернарными операторами


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
    let isFormValid = true;
    if(!formProps.title?.trim().length){
      setFormValidState(state => ({...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState(state => ({...state, title: true }));
    }

    if(!formProps.text?.trim().length){
      setFormValidState(state => ({...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState(state => ({...state, text: true }));
    }

    if(!formProps.date){
      setFormValidState(state => ({...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState(state => ({...state, date: true }));
    }

    if(!isFormValid){
      return;
    }

    onSubmit(formProps);
    console.log(formProps);
  }



  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div>
        <input type="text" name='title' className={classNames(styles['input-title'], {
          [styles.invalid] : !formValidState.title 
        })} />
      </div>
        <div className={styles.formRow} >
          <label htmlFor="date" className={styles.formLabel}>
            <img src="/calendar.svg" alt='Иконка календаря'/>
            <span>Дата</span> 
          </label>
          <input type="date" name='date' id='date' className={classNames(styles.input, {
            [styles.invalid] : !formValidState.date
          })} />
        </div>

        <div className={styles.formRow} >
          <label htmlFor="tag" className={styles.formLabel}>
            <img src="/folder.svg" alt='Иконка календаря'/>
            <span>Метки</span> 
          </label>
          <input  type="text" id='tag' name='tag' className={styles.input} />
        </div>
        


        <textarea name="text" id="" cols='30' rows='10' className={classNames(styles.input, {
          [styles.invalid] : !formValidState.text
        })} ></textarea>
        <Button text = 'Сохранить'/>
    </form>
  )
}

export default JournalForm