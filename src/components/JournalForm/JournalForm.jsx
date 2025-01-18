import { useContext, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames'; //библиотека для упрощения выражений с тернарными операторами

import styles from  './JournalForm.module.scss';

import { formReducer, INITIAL_STATE } from './JournalForm.state';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm( { onSubmit, data, onDelete } ) {
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
    if(!data) {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId }});
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
  }, [data])


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
      dispatchForm({ type: 'SET_VALUE', payload: { userId }});
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId }});
  }, [userId])
  
  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [ e.target.name ]: e.target.value } });
  }
  
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT'});
  }

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUE', payload: { userId }});
  }


  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div className={styles.formRow}>
        <Input type="text" name='title' isValid={isValid.title} ref={titleref} value={values.title} onChange={onChange} appearance='title' />
        {data?.id && <button className={styles.deleteButton} type='button' onClick={ deleteJournalItem } >
          <img src="/delete.svg" alt="" />
        </button>}
      </div>
      <div className={styles.formRow} >
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt='Иконка календаря'/>
          <span>Дата</span> 
        </label>
        <Input type="date" name='date' id='date' isValid={isValid.date} ref={dateref} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : '' } onChange={onChange} />
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
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm