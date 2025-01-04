import { useContext, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames'; //библиотека для упрощения выражений с тернарными операторами

import styles from  './JournalForm.module.scss';

import { formReducer, INITIAL_STATE } from './JournalForm.state';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm( { onSubmit } ) {
  const [ formState, dispatchForm ] = useReducer (formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleref = useRef();
  const textref = useRef();
  const dateref = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch(true){
      case !isValid.title :
        titleref.current.focus();
        break;
      case !isValid.date :
        dateref.current.focus();
        break;
      case !isValid.text :
        textref.current.focus();
        break;
    }
  }


  useEffect(()=> {
    let timerId;
    if(!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid)
      timerId = setTimeout(()=> {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
      return ()=> {
        clearTimeout(timerId);
      }
    }
  }, [isValid]);

  useEffect(()=> {
    if(isFormReadyToSubmit){
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);
  
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT'});
  }

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [ e.target.name ]: e.target.value } })
  }


  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      {userId}
      <div>
        <Input type="text" name='title' isValid={isValid.title} ref={titleref} value={values.title} onChange={onChange} appearance='title' />
      </div>
      <div className={styles.formRow} >
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt='Иконка календаря'/>
          <span>Дата</span> 
        </label>
        <Input type="date" name='date' id='date' isValid={isValid.date} ref={dateref} value={values.date} onChange={onChange} />
      </div>

      <div className={styles.formRow} >
        <label htmlFor="tag" className={styles.formLabel}>
          <img src="/folder.svg" alt='Иконка календаря'/>
          <span>Метки</span> 
        </label>
        <Input  type="text" id='tag' name='tag' value={values.tag} onChange={onChange} />
      </div>

      <textarea name="text" id="" cols='30' rows='10' ref={textref} value={values.text} onChange={onChange} className={classNames(styles.input, {
        [styles.invalid] : !isValid.text
      })} ></textarea>
      <Button text = 'Сохранить'/>
    </form>
  )
}

export default JournalForm