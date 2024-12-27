import styles from  './JournalForm.module.scss';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import classNames from 'classnames'; //библиотека для упрощения выражений с тернарными операторами
import { formReducer, INITIAL_STATE } from './JournalForm.state';





function JournalForm( { onSubmit } ) {
  const [ formState, dispatchForm ] = useReducer (formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(()=> {
    let timerId;
    if(!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(()=> {
        dispatchForm({ type: 'RESET_VALIDY' });
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
  }, [isFormReadyToSubmit]);
  
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT'});
  }

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [ e.target.name ]: e.target.value } })
  }


  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div>
        <input type="text" name='title' value={values.title} onChange={onChange} className={classNames(styles['input-title'], {
          [styles.invalid] : !isValid.title 
        })} />
      </div>
        <div className={styles.formRow} >
          <label htmlFor="date" className={styles.formLabel}>
            <img src="/calendar.svg" alt='Иконка календаря'/>
            <span>Дата</span> 
          </label>
          <input type="date" name='date' id='date' value={values.date} onChange={onChange} className={classNames(styles.input, {
            [styles.invalid] : !isValid.date
          })} />
        </div>

        <div className={styles.formRow} >
          <label htmlFor="tag" className={styles.formLabel}>
            <img src="/folder.svg" alt='Иконка календаря'/>
            <span>Метки</span> 
          </label>
          <input  type="text" id='tag' name='tag' value={values.tag} onChange={onChange} className={styles.input} />
        </div>
        


        <textarea name="text" id="" cols='30' rows='10' value={values.text} onChange={onChange} className={classNames(styles.input, {
          [styles.invalid] : !isValid.text
        })} ></textarea>
        <Button text = 'Сохранить'/>
    </form>
  )
}

export default JournalForm