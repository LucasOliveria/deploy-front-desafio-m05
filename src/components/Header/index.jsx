import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ArrowDown from '../../assets/arrow-down.svg';
import { formatAvatarLetters, formatUsernameFirstName } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import HeaderDialogMenu from '../HeaderDialogMenu';
import './style.css';

function Header() {
  const { user } = useDashboard();

  const { pathname } = useLocation();

  const idParams = useParams();

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
      <div className="titles">
        {
          pathname === '/dashboard/home' ?
            <p className='header-primary-title'>Resumo das cobranças</p>
            :
            <p className='header-secondary-title'>
              {
                pathname === '/dashboard/cobrancas' ?
                  "Cobranças"
                  :
                  "Clientes"
              }
            </p>
        }
        {
          pathname !== '/dashboard/home'
            &&
            pathname !== '/dashboard/clientes'
            &&
            pathname !== '/dashboard/cobrancas' ?
            <div className="caption">
              <span >
                &gt;
              </span>
              <span>
                Detalhes do cliente
              </span>
            </div>
            :
            ""
        }
      </div>
      <ul className='header-user-menu'>
        <li className='avatar'>
          {user?.name && formatAvatarLetters(user.name)}
        </li>
        <li title={user.name} className='user-name'>
          {user?.name && formatUsernameFirstName(user.name)}
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