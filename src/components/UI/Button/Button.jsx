const Button = ({ cta, classColor, onHandleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${classColor}`}
      onClick={onHandleClick}
    >
      {cta}
    </button>
  )
}

Button.defaultProps = {
  classColor: 'btn-primary',
  cta: 'Texto',
  disabled: false,
  onHandleClick: () => {}
}

export default Button
