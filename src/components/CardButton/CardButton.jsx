import styles from './CardButton.module.scss'


function CardButton({ children, className }) {

  const cl = `${styles.cardButton} ${className || ''}`.trim();
  return (
    <button className={cl}>{ children }</button>
  )
}

export default CardButton