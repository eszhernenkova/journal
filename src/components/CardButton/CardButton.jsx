import styles from './CardButton.module.scss'


function CardButton({ children, className, ...props }) {

  const cl = `${styles.cardButton} ${className || ''}`.trim();
  return (
    <button {...props} className={cl}>{ children }</button>
  )
}

export default CardButton