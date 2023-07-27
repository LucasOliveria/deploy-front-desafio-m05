import './style.css';
import EditIcon from '../../assets/edit-icon.svg'
import LogoutIcon from '../../assets/logout-icon.svg'
import MenuDialogPolygonImg from '../../assets/menu-dialog-polygon.svg'
import useDashboard from '../../hooks/useDashboard';
import { clearStorage } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

function HeaderDialogMenu({ modalRef }) {
  const navigateTo = useNavigate()

  const { setOpenEditUser, setFormData, user } = useDashboard();

  const handleLogout = () => {
    clearStorage()
    navigateTo('/')
  }

  const handleUserEdit = () => {
    setOpenEditUser(true)
    setFormData({
      ...user,
      password: '',
      cpf: '',
      phone: '',
      confirmNewPassword: '',
    })
  }

  return (
    <dialog ref={modalRef} className='MenuDialog'>
      <div className='modal-wrapper'>
        <img className='polygon-img' src={MenuDialogPolygonImg} alt="" />
        <div className='button-wrapper'
          onClick={handleUserEdit}
        >
          <img className='edit-icon icon-img' src={EditIcon} alt="editar" />
          <p>Editar</p>
        </div>
        <div className='button-wrapper'
          onClick={handleLogout}
        >
          <img className='icon-img' src={LogoutIcon} alt="sair" />
          <p>Sair</p>
        </div>
      </div>
    </dialog>
  )
}

export default HeaderDialogMenu;
