
import SelectUser from '../SelectUser/SelectUser'
import Logo from '../Logo/Logo';

const logos = ['/Logo.svg', 'vite.svg'];

function Header() {

  return (
    <>
      <Logo image={logos[0]} />
      <SelectUser />
    </>
  )
}

export default Header