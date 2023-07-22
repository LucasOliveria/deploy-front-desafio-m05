import { NavLink } from 'react-router-dom';
import './style.css';
import { ClientsIcon } from '../../IconsSvg/ClientsIcon';
import { HomeIcon } from '../../IconsSvg/HomeIcon';
import { ChargesIcon } from '../../IconsSvg/ChargesIcon';

function Sidebar() {
  return (
    <nav className='Sidebar'>
      <NavLink to={'/dashboard/home'}>
        <HomeIcon />
        Home
      </NavLink>
      <NavLink to={'/dashboard/clientes'}>
        <ClientsIcon />
        Clientes
      </NavLink>
      <NavLink to={'/dashboard/cobrancas'}>
        <ChargesIcon />
        Cobranças
      </NavLink>
    </nav>
  )
}

export default Sidebar;
