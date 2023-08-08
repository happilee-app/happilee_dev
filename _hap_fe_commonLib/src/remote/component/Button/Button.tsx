import React from 'react'
interface ButtonProps {
  className?: string
  id?: string
  label?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  id = 'button',
  label = 'Click Me',
  onClick = () => void {},
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      onClick={(event) => onClick(event)}
      aria-label="button"
      className={`${className} btn      `}
      id={id}
    >
      {label}
    </button>
  )
}

export { Button }
