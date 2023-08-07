import React, { MouseEventHandler } from 'react'
interface ButtonProps {
  className?: string
  id?: string
  primary?: boolean
  label?: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: React.FC<ButtonProps> = ({
  className = '',

  id = 'button',
  primary = false,
  label = 'Click Me',
  onClick = () => void {},
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      onClick={(event) => onClick(event)}
      aria-label="button"
      className={`${className} btn ${primary ? 'btn-primary ' : ' btn-secondary '}
    `}
      id={id}
    >
      {label}
    </button>
  )
}

export { Button }
