declare module 'Button' {
  import React from 'react'
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    id?: string
    label?: string
    color?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  }
  const Button: React.FC<ButtonProps>
  export default Button
}
