import { useLocation } from 'react-router-dom';
import ArrowDown from '../../assets/arrow-down.svg';
import './style.css';
// import { formatAvatarLetters, formatUsernameFirstName } from '../../helpers/formatter';
import { useRef, useState } from 'react';
import useDashboard from '../../hooks/useDashboard';
import HeaderDialogMenu from '../HeaderDialogMenu';

function Header() {
  const { user, setUser, api } = useDashboard();

  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);

  const modalRef = useRef(null);

  const handleMenuModal = () => {
    if (openModal) {
      modalRef.current.close()
    } else {
      modalRef.current.show()
    }
    return setOpenModal(!openModal)
  }



  return (
    <header className='Header'>
      {pathname === '/dashboard/home' ?
        <p className='header-primary-title'>Resumo das cobranças</p> :
        <p className='header-secondary-title'>Clientes</p>}
      <ul className='header-user-menu'>
        <li className='avatar'>
          {/* {formatAvatarLetters(username)} */}
          CL
        </li>
        <li title={user.name} className='user-name'>
          {/* {formatUsernameFirstName(username)} */}
          {user.name}
        </li>
        <li className='menu-button' onClick={handleMenuModal}>
          <img className='menu-button' src={ArrowDown} alt="abrir menu" />
          <HeaderDialogMenu
            modalRef={modalRef}
          />
        </li>
      </ul>
    </header>
  )
}

export default Header;
