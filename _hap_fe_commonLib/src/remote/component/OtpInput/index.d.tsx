declare module 'OtpInput' {
  import React from 'react'

  export type messageType = 'error' | 'success'

  export interface OtpInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string | number
    length?: number
    separator?: ((index: number) => React.ReactNode) | React.ReactNode
    className?: string
    id?: string
    message?: string
    type?: messageType
    name?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  }

  const OtpInput: React.FC<OtpInputProps>
  export default OtpInput
}
