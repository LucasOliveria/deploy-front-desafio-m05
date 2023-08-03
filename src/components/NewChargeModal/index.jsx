import { useRef, useState } from 'react';
import { toast } from "react-toastify";
import BlankChargeIcon from '../../assets/blank-charge.svg';
import CheckedIcon from '../../assets/checked-icon.svg';
import CloseIcon from "../../assets/icon-close.svg";
import SuccessIcon from "../../assets/iconsucces.svg";
import { formatCurrencyInput, formatCurrencyToCents, formatDate } from '../../helpers/formatter';
import api from '../../services/api';
import { headers } from '../../utils/headers';
import './style.css';
import useDashboard from '../../hooks/useDashboard';

function NewChargeModal({ newChargeRef, client,
  incomeCharge = { description: '', due_date: '', value: '', status: 'pago' },
  editing = false }) {

  const { clientDetails, setClientDetails, setCharges } = useDashboard()

  const [description, setDescription] = useState(incomeCharge.description)
  const [dueDate, setDueDate] = useState(incomeCharge.due_date ? formatDate(incomeCharge.due_date, "yyyy-MM-dd") : '')
  const [value, setValue] = useState(`R$ ${incomeCharge.value}`)
  const [status, setStatus] = useState(incomeCharge.status)

  const [descriptionError, setDescriptionError] = useState(false)
  const [dueDateError, setDueDateError] = useState(false)
  const [valueError, setValueError] = useState(false)

  const genericErrorMessage = "Este campo deve ser preenchido"

  const hasErrors = useRef(false)

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
        //TODO editing
        toastMessage = "Cobrança editada com sucesso"
      } else {
        toastMessage = "Cobrança cadastrada com sucesso"

        const { data } = await api.post('/charge', newCharge, { headers: headers() })

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
      toast.update(id, { render: "Não foi possível cadastrar a cobrança", type: "error", isLoading: false, autoClose: 1500 });
    }
  }

  const handleClose = () => {
    newChargeRef.current.close()
    clearForm()
  }

  function clearForm() {
    setDescription(incomeCharge.description)
    setDueDate(incomeCharge.due_date ? formatDate(incomeCharge.due_date, "yyyy-MM-dd") : '')
    setValue(`R$ ${incomeCharge.value}`)
    setStatus(incomeCharge.status)
    hasErrors.current = false
    setDescriptionError(false)
    setDueDateError(false)
    setValueError(false)
  }

  return (
    <dialog className='NewChargeModal' ref={newChargeRef}>
      <div className='dialog-inner-wrapper'>
        <dir className='form-header'>
          <img className='x-close-button' src={CloseIcon} alt="fechar" onClick={handleClose} />
          <div className='title-div'>
            <img className='title-icon' src={BlankChargeIcon} alt="nova cobrança" />
            <span className='title'>Cadastro de Cobrança</span>
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
            <div className='radio-inner-div'>
              {status === 'pago' ?
                <div className='radio-icon-background checked'>
                  <img className='radio-checked-icon' src={CheckedIcon} alt="" />
                </div>
                :
                <div className='radio-icon-background unchecked' />
              }
              <input type="radio" name="status" id="pago" defaultChecked={status === 'pago' ? true : false} value='pago' onChange={handleChange} />
              <label htmlFor="pago" onClick={() => setStatus('pago')}>Cobrança Paga</label>
            </div>
            <div className='radio-inner-div'>
              {status === 'pendente' ?
                <div className='radio-icon-background checked'>
                  <img className='radio-checked-icon' src={CheckedIcon} alt="" />
                </div>
                :
                <div className='radio-icon-background unchecked' />
              }
              <input type="radio" name="status" id="pendente" defaultChecked={status === 'pendente' ? true : false} value='pendente' onChange={handleChange} />
              <label htmlFor="pendente" onClick={() => setStatus('pendente')} >Cobrança Pendente</label>
            </div>
          </div>

          <div className='buttons-div'>
            <button className='cancel-button' type='button' onClick={handleClose}>Cancelar</button>
            <button className='submit-button' >Aplicar</button>
          </div>
        </form>
      </div >
    </dialog >
  )
}

export default NewChargeModal;
