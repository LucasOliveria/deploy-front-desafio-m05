import './style.css';

function StepsBottom({ stepLine }) {
  return (
    <div className="container-current-step">
      <div className={`step ${stepLine === 1 && "current-step"}`}></div>
      <div className={`step ${stepLine === 2 && "current-step"}`}></div>
      <div className={`step ${stepLine === 3 && "current-step"}`}></div>
    </div>
  )
}

export default StepsBottom;