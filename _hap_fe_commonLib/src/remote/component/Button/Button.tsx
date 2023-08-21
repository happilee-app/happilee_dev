// @ts-ignore
import React from 'react'

interface ButtonProps {
  className?: string
  id?: string
  label?: string
  color?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * @namespace CommonLib
 * @param {ButtonProps} Props
 * @returns {React.JSX.Element}
 */
const Button: React.FC<ButtonProps> = ({
  className = '',
  id = 'button',
  label = 'Click Me',
  color = '#0B3966',
  onClick = () => void {},
  ...restProps
}: ButtonProps): React.JSX.Element => (
  <button
    {...restProps}
    onClick={(event) => onClick(event)}
    aria-label="button"
    className={`${className} btn bg-[${color}] `}
    id={id}
  >
    {label}
  </button>
)

export { Button }
