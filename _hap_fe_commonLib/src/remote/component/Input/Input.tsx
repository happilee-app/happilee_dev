import React, { ChangeEvent } from 'react'

interface InputProps {
  className?: string
  labelClassName?: string
  name?: string
  id?: string
  error?: string
  label?: string
  placeHolder?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
/**
 * @namespace CommonLib
 * @param {InputProps} Props
 * @returns {React.JSX.Element}
 */

const Input: React.FC<InputProps> = ({
  label = 'label',
  name = 'name',
  id = 'id',
  placeHolder = 'Enter',
  error = '',
  onChange = () => {},
  ...restProps
}: InputProps): React.JSX.Element => {
  return (
    <div aria-label="input-container" className="inputContainer">
      <label aria-label="label" htmlFor={id} className="inputContainer__label">
        {label}
      </label>
      <div className="inputContainer__input">
        <input
          {...restProps}
          aria-label="input"
          name={name}
          id={id}
          placeholder={placeHolder}
          onChange={(event) => onChange(event)}
        />
      </div>
      <span aria-label="error" className="inputContainer__error">
        {error}
      </span>
    </div>
  )
}

export { Input }
