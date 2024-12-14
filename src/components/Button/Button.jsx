import { useState } from 'react';
import './Button.scss';

function Button({ text }) {
  return (
    <button className='button accent'>{text}</button>
  )
}

export default Button