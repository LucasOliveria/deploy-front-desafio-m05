import './style.css';
import ArrowDown from '../../../assets/arrow-down.svg'

function Header() {
  return (
    <header className='Header'>
      <p className='header-title'>Resumo das cobranças</p>
      <ul className='header-user-menu'>
        <li className='avatar'>
          LR
        </li>
        <li className='user-name'>Lorena</li>
        <li className='menu-button'>
          <img src={ArrowDown} alt="abrir menu" />
        </li>
      </ul>
    </header>
  )
}

export default Header;
