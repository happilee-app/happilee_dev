declare module 'Input' {
  import React, { ChangeEvent, ReactNode } from 'react'
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    labelClassName?: string
    name?: string
    id?: string
    error?: string
    label?: string
    placeHolder?: string
    value?: string | number
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    children?: ReactNode
  }

  const Input: React.FC<InputProps>
  export default Input
}
