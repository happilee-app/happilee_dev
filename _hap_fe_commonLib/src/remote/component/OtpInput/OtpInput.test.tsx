import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { OtpInput } from './OtpInput'
import { act } from 'react-dom/test-utils'

let renderResult: RenderResult
let onChange: () => void
describe('OptInput', () => {
  beforeEach(() => {
    onChange = jest.fn()
    renderResult = render(<OtpInput length={6} value="" onChange={onChange} />)
  })
  it('should render without crashing', async () => {
    await waitFor(() => {
      expect(renderResult.getByLabelText('otp')).toBeInTheDocument()
    })
  })
  it('Should render 6 input field ', async () => {
    const _result = renderResult.getAllByLabelText('otp-container')
    await waitFor(() => {
      expect(_result.length).toBe(6)
    })
  })

  it('OnChange event correct otp', async () => {
    renderResult.unmount()
    onChange = jest.fn()
    renderResult = render(<OtpInput length={6} value="" onChange={onChange} type="success" message="correct" />)
    const _result = renderResult.getAllByRole('textbox')
    const otp = '123456'
    act(() => {
      otp.split('').forEach((ele, index) => {
        fireEvent.change(_result[index], { target: { value: ele } })
      })
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(6)
    })
    const _messageResult = renderResult.getByLabelText('otp-message')
    await waitFor(() => {
      expect(_messageResult).toBeInTheDocument()
      expect(_messageResult).toHaveClass('text-green-500')
      expect(_messageResult.innerHTML).toBe('correct')
    })
  })
  it('OnChange event incorrect correct otp', async () => {
    renderResult.unmount()
    onChange = jest.fn()
    renderResult = render(<OtpInput length={6} value="" onChange={onChange} type="error" message="in-correct" />)
    const _result = renderResult.getAllByRole('textbox')
    const otp = '1234'
    act(() => {
      otp.split('').forEach((ele, index) => {
        fireEvent.change(_result[index], { target: { value: ele } })
      })
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(4)
    })
    const _messageResult = renderResult.getByLabelText('otp-message')
    await waitFor(() => {
      expect(_messageResult).toBeInTheDocument()
      expect(_messageResult).toHaveClass('text-red-500')
      expect(_messageResult.innerHTML).toBe('in-correct')
    })
  })
  it('Should clear when backspace trigger', async () => {
    renderResult.unmount()
    onChange = jest.fn()
    renderResult = render(<OtpInput length={6} value="" onChange={onChange} />)
    const _result = renderResult.getAllByRole('textbox')
    const otp = '123456'
    await act(async () => {
      otp.split('').forEach((ele, index) => {
        fireEvent.change(_result[index], { target: { value: ele, name: `test-${index}` } })
      })
    })
    fireEvent.keyDown(_result[5], { key: 'Backspace' })
    await waitFor(() => {
      //@ts-ignore
      expect(_result[5].value).toBe('')
    })
  })
  it('Should have a separator(-)', async () => {
    renderResult.unmount()
    renderResult = render(<OtpInput separator="-" />)
    const _result = renderResult.getAllByLabelText('otp-separator')
    await waitFor(() => {
      _result.forEach((element) => {
        expect(element).toBeInTheDocument()
      })
    })
  })
})
