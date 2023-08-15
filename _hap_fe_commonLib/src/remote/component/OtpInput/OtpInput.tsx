import React, { useCallback, useEffect, useRef, useState } from 'react'

type messageType = 'error' | 'success'

interface OtpInputProps {
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
/**
 * @namespace CommonLib
 * @param {OtpInputProps} Props
 * @returns {React.JSX.Element}
 */
const OtpInput: React.FC<OtpInputProps> = ({
  value = '',
  length = 3,
  separator = '',
  className = '',
  id = '',
  message = '',
  type = '',
  name = '',
  onChange = () => {},
  ...restProps
}) => {
  const _inputRef = useRef<Array<HTMLInputElement | null>>([])
  const [activeField, setActiveField] = useState(0)

  const getOtpValue = () => (value ? value.toString().split('') : [])

  const isInputValueValid = (value: string) => value.trim().length === 1
  /**
   * @function handleOTPChange
   * @param otp
   * @description combine the values of an array into a single value
   * and pass to the onChange event
   */
  const handleOTPChange = (otp: Array<string>) => {
    const _value = otp.join('')
    onChange({
      // @ts-ignore
      target: {
        name,
        value: _value,
      },
    })
  }
  /**
   * @function changeFocus
   * @param value
   * @description When the input field focus changes, retrieve the current value
   */
  const changeFocus = (value: string) => {
    const otp = getOtpValue()
    otp[activeField] = value[0]
    handleOTPChange(otp)
  }
  /**
   * @function onFocusInput
   * @param index
   * @description Inspect the active field to determine if it conforms to the limit. If
   * inputRef[limit] is true, shift the focus and update the state.
   */
  const onFocusInput = (index: number) => {
    const _activeInput = Math.max(Math.min(length - 1, index), 0)
    if (_inputRef.current[_activeInput]) {
      _inputRef.current[_activeInput]?.focus()
      _inputRef.current[_activeInput]
      setActiveField(_activeInput)
    }
  }
  /**
   * @function onHandleOtpChange
   * @param event
   * @description
   */
  const onHandleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = event.target.value
    if (isInputValueValid(_value)) {
      changeFocus(_value)
      onFocusInput(activeField + 1)
    }
  }
  /**
   * @function onHandleFocus
   * @param event
   * @returns
   */
  const onHandleFocus = (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
    setActiveField(index)
    event.target.select()
  }

  const onHandleBlur = () => setActiveField((prev) => prev - 1)
  /**
   * @function onHandleInputChange
   * @param event
   */
  const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputValueValid(event.target.value)) {
      // @ts-ignore
      if (event.nativeEvent.data === null && event.nativeEvent.inputType === 'deleteContentBackward') {
        event.preventDefault()
        changeFocus('')
        setActiveField((prev) => prev - 1)
      }
      event.target.value = ''
    }
  }

  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const _otp = getOtpValue()
      const handlers: Record<string, () => void> = {
        Backspace: () => {
          event.preventDefault()
          changeFocus('')
          setActiveField((prev) => prev - 1)
        },
        Delete: () => {
          event.preventDefault()
          changeFocus('')
        },
        ArrowLeft: () => {
          event.preventDefault()
          setActiveField((prev) => prev - 1)
        },
        ArrowRight: () => {
          event.preventDefault()
          setActiveField((prev) => prev + 1)
        },
      }
      const handler = handlers[event.code]
      if (handler) {
        handler()
      } else if (event.key === _otp[activeField]) {
        event.preventDefault()
        setActiveField((prev) => prev + 1)
      }
      // prevent default behaviour
      if (['Spacebar', 'space', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
        event.preventDefault()
      }
    },
    [activeField, value, onFocusInput, changeFocus]
  )
  /**
   * @function onHandlePaste
   * @param event
   */
  const onHandlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const _otp = getOtpValue()
    const valueFromClipBoard = event.clipboardData
      .getData('text/plain')
      .slice(0, length - activeField)
      .split('')

    Array.from({ length: length }, (_, index) => index).forEach((index) => {
      if (index >= activeField && valueFromClipBoard.length > 0) {
        _otp[index] = valueFromClipBoard.shift() ?? ''
        setActiveField((prev) => prev++)
      }
    })
    handleOTPChange(_otp)
  }

  useEffect(() => {
    _inputRef.current = _inputRef.current.slice(0, length)
    _inputRef.current[0]?.focus
  }, [length])

  return (
    <div className={`${className} otpContainer`} aria-label="otp">
      <div className="otpContainer__input">
        {Array.from({ length: length }, (_, index) => index).map((index) => (
          <div
            aria-label="otp-container"
            key={index}
            className={`otpContainer__input__main  ${
              message !== '' ? (type === 'success' ? ' brd brd--success' : ' brd brd--error') : null
            }`}
          >
            <input
              value={getOtpValue()[index] ?? ''}
              onKeyDown={(event) => onHandleKeyDown(event)}
              type="text"
              ref={(el) => (_inputRef.current[index] = el)}
              onChange={(event) => onHandleOtpChange(event)}
              onBlur={onHandleBlur}
              onFocus={(event) => onHandleFocus(event)(index)}
              onInput={onHandleInputChange}
              onPaste={onHandlePaste}
              autoComplete="off"
              maxLength={1}
              inputMode="text"
            />
            {separator !== '' ? (
              <span>{index < length - 1 && (typeof separator === 'function' ? separator(index) : separator)}</span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="otpContainer__message">
        {message !== '' ? (
          <span aria-label="otp-message" className={`${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export { OtpInput }
