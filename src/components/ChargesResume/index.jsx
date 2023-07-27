import { formatCurrency } from '../../helpers/formatter'
import './style.css'


function ChargesResume({ imageSrc, title, value, backgroundColor }) {
  return (
    <div className='ChargesResume'
      style={{ background: `${backgroundColor}` }}
    >
      <img src={imageSrc} alt="" />
      <div className='details'>
        <p className='title'>{title}</p>
        <p className='value'>{formatCurrency(value)}</p>
      </div>
    </div>
  )
}

export default ChargesResume