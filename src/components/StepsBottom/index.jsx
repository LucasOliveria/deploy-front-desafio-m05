import './style.css';

function StepsBottom({ currentStep }) {
  return (
    <div className="container-current-step">
      <div className={`step ${currentStep === 0 && "current-step"}`}></div>
      <div className={`step ${currentStep === 1 && "current-step"}`}></div>
      <div className={`step ${currentStep === 2 && "current-step"}`}></div>
    </div>
  )
}

export default StepsBottom;