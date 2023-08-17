import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import BlankChargeIcon from '../../assets/blank-charge.svg';
import CheckedIcon from '../../assets/checked-icon.svg';
import failureIcon from '../../assets/failure-icon.svg';
import CloseIcon from "../../assets/icon-close.svg";
import SuccessIcon from "../../assets/iconsucces.svg";
import { formatCurrencyInput, formatCurrencyToCents } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { headers } from '../../utils/headers';
import './style.css';

function NewChargeModal() {
  const {
    clientDetails,
    setClientDetails,
    setCharges,
    newChargeClient: client,
    editingCharge: incomeCharge,
    isEditingCharge: editing,
    handleNewChargeModalClose,
    clients,
    setClients,
    setHomeModifier,
    setClientsModifier,
    setFilteredCharges,
    setSearchCharges
  } = useDashboard()
  const location = useLocation()
  const opennedLocation = useRef(location.pathname)

  const [description, setDescription] = useState(incomeCharge.description);
  const [dueDate, setDueDate] = useState(incomeCharge.due_date ? incomeCharge.due_date.slice(0, 10) : '');
  const [value, setValue] = useState(incomeCharge.value ? formatCurrencyInput(`R$ ${incomeCharge.value / 100}`, '') : 'R$ ');
  const [status, setStatus] = useState(incomeCharge.status);

  const [descriptionError, setDescriptionError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);
  const [valueError, setValueError] = useState(false);

  const hasErrors = useRef(false);

  const lockSubmit = useRef(false);

  const genericErrorMessage = "Este campo deve ser preenchido";

  const handleChange = (e) => {
    const [inputName, inputValue] = [e.target.name, e.target.value]
    hasErrors.current = false
    switch (inputName) {
      case 'description':
        setDescription(inputValue)
        setDescriptionError(false)
        break
      case 'dueDate':
        setDueDate(inputValue)
        setDueDateError(false)
        break
      case 'value':
        setValue(formatCurrencyInput(inputValue, value))
        setValueError(false)
        break
      case 'status':
        setStatus(inputValue)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (lockSubmit.current) {
      return
    } else {
      lockSubmit.current = true
    }
    if (!description) {
      setDescriptionError(true)
      hasErrors.current = true
    }
    if (!dueDate) {
      setDueDateError(true)
      hasErrors.current = true
    }
    if (!value.split('R$ ')[1]) {
      setValueError(true)
      hasErrors.current = true
    }

    if (hasErrors.current === true) {
      lockSubmit.current = false
      return
    }

    const id = toast.loading("Por favor, aguarde...");

    try {
      const formattedValue = formatCurrencyToCents(value)
      const newCharge = {
        client_id: client.id,
        description,
        value: formattedValue,
        due_date: dueDate,
        status,
      }

      let toastMessage;

      if (editing) {
        toastMessage = "Cobrança editada com sucesso"

        const { client_id: _, ...editedCharge } = newCharge;
        const { data: updatedCharge } = await api.put(`/charge/${incomeCharge.id}`, editedCharge, { headers: headers() });

        if (updatedCharge.up_to_date === "Vencida") {
          const localClients = [...clients];

          const updatedClient = localClients.find((client) => client.id === updatedCharge.client_id);

          updatedClient.up_to_date = false;

          setClients(localClients);
        } else {
          setClientsModifier(updatedCharge);
        }

        setHomeModifier(updatedCharge);

        setSearchCharges('');

        setFilteredCharges((oldCharges) => {
          const localCharges = [...oldCharges]
          const index = localCharges.findIndex(charge => charge.id === incomeCharge.id)
          localCharges.splice(index, 1, updatedCharge)
          return localCharges
        });

        setCharges((oldCharges) => {
          const localCharges = [...oldCharges]
          const index = localCharges.findIndex(charge => charge.id === incomeCharge.id)
          localCharges.splice(index, 1, updatedCharge)
          return localCharges
        })

        if (clientDetails?.charges) {
          setClientDetails((oldClientDetails) => {
            const localOldClientDetailsCharges = [...(oldClientDetails.charges)]
            const index = localOldClientDetailsCharges.findIndex(charge => charge.id === incomeCharge.id)
            localOldClientDetailsCharges.splice(index, 1, updatedCharge)

            oldClientDetails.charges = localOldClientDetailsCharges
            return oldClientDetails
          })
        }

      } else {
        toastMessage = "Cobrança cadastrada com sucesso"

        const { data } = await api.post('/charge', newCharge, { headers: headers() })


        if (data.up_to_date === "Vencida") {
          const localClients = [...clients];

          const defaulterClient = localClients.find((client) => client.id === data.client_id)

          defaulterClient.up_to_date = false;

          setClients(localClients);
        }

        setHomeModifier(data);

        setCharges((oldCharges) => {
          const localCharges = [...oldCharges]
          localCharges.push(data)
          return localCharges
        })

        if (clientDetails?.charges) {
          setClientDetails((oldClientDetails) => {
            oldClientDetails.charges.push(data)
            return oldClientDetails
          })
        }
      }

      toast.update(id, { render: toastMessage, type: "success", isLoading: false, autoClose: 1500, position: "bottom-right", icon: ({ theme, type }) => <img src={SuccessIcon} /> });

      handleClose()

    } catch (error) {
      handleClose()
      toast.update(id, { render: "Não foi possível cadastrar ou editar a cobrança", type: "error", isLoading: false, autoClose: 1500, position: "bottom-right", icon: ({ theme, type }) => <img src={failureIcon} /> });
    } finally {
      lockSubmit.current = false
    }
  }

  const handleClose = () => {
    handleNewChargeModalClose()
    clearForm()
  }

  function clearForm() {
    setDescription(incomeCharge.description)
    setDueDate(incomeCharge.due_date ? incomeCharge.due_date.slice(0, 10) : '')
    setValue(incomeCharge.value ? formatCurrencyInput(`R$ ${incomeCharge.value / 100}`, '') : 'R$ ')
    setStatus(incomeCharge.status)
    hasErrors.current = false
    setDescriptionError(false)
    setDueDateError(false)
    setValueError(false)
  }

  const formWrapperRef = useRef(null)

  const handleClickOutsideDialog = (e) => {
    if (!formWrapperRef.current.contains(e.target)) {
      handleClose()
    }
  }

  useEffect(() => {
    if (opennedLocation.current !== location.pathname) {
      handleClose()
    }
  }, [location])

  return (
    <div className='NewChargeModal' onClick={handleClickOutsideDialog}>
      <div className='dialog-inner-wrapper' ref={formWrapperRef}>
        <dir className='form-header'>
          <div className='title-div'>
            <img className='title-icon' src={BlankChargeIcon} alt="nova cobrança" />
            <span className='title'>{editing ? 'Edição' : 'Cadastro'} de Cobrança</span>
            <img className='x-close-button' src={CloseIcon} alt="fechar" onClick={handleClose} />
          </div>
        </dir>
        <form className='new-charge-form' onSubmit={handleSubmit}>
          <label htmlFor="name">Nome*</label>
          <input type="text" id='name' name='name' readOnly
            value={client?.name || ''} />

          <label htmlFor="description">Descrição*</label>
          <textarea id='description' name='description' placeholder='Digite a descrição'
            className={descriptionError ? 'error' : ''}
            value={description} onChange={handleChange} />
          <span className='error' style={{ opacity: `${descriptionError ? 1 : 0}` }}>{genericErrorMessage}</span>
          <div className='double-input-div'>
            <div className='double-input-inner-div'>
              <label htmlFor="dueDate">Vencimento*</label>
              <input type="date" id='dueDate' name='dueDate' placeholder='Data de vencimento'
                className={dueDateError ? 'error' : ''}
                value={dueDate} onChange={handleChange} />
              <span className='error' style={{ opacity: `${dueDateError ? 1 : 0}` }}>{genericErrorMessage}</span>
            </div>
            <div className='double-input-inner-div'>
              <label htmlFor="value">Valor*</label>
              <input type="text" id='value' name='value' placeholder='Digite o valor'
                className={valueError ? 'error' : ''}
                value={value} onChange={handleChange} />
              <span className='error' style={{ opacity: `${valueError ? 1 : 0}` }}>{genericErrorMessage}</span>
            </div>
          </div>

          <div className='radio-div'>
            <label htmlFor="status">Status*</label>
            <div className='radio-inner-div' onClick={() => setStatus('pago')}>
              {status === 'pago' ?
                <div className='radio-icon-background checked'>
                  <img className='radio-checked-icon' src={CheckedIcon} alt="" />
                </div>
                :
                <div className='radio-icon-background unchecked' />
              }
              <input type="radio" name="status" id="pago" defaultChecked={status === 'pago' ? true : false} value='pago' onChange={handleChange} />
              <label htmlFor="pago">Cobrança Paga</label>
            </div>
            <div className='radio-inner-div' onClick={() => setStatus('pendente')}>
              {status === 'pendente' ?
                <div className='radio-icon-background checked'>
                  <img className='radio-checked-icon' src={CheckedIcon} alt="" />
                </div>
                :
                <div className='radio-icon-background unchecked' />
              }
              <input type="radio" name="status" id="pendente" defaultChecked={status === 'pendente' ? true : false} value='pendente' onChange={handleChange} />
              <label htmlFor="pendente">Cobrança Pendente</label>
            </div>
          </div>

          <div className='buttons-div'>
            <button className='cancel-button' type='button' onClick={handleClose}>Cancelar</button>
            <button className='submit-button' >Aplicar</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default NewChargeModal;
