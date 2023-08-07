import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react'
import { Button } from './Button'
import React from 'react'
import { act } from 'react-dom/test-utils'

let renderResult: RenderResult
let button: HTMLElement
let handleClick: () => void
describe('Button', () => {
  beforeEach(() => {
    handleClick = jest.fn()
    renderResult = render(<Button onClick={handleClick} label="Button" id="test-id" primary />)
    button = renderResult.getByLabelText('button')
  })
  afterEach(() => {
    renderResult.unmount()
  })
  it('Should render without crash ', async () => {
    await waitFor(() => {
      expect(button.innerHTML).toBe('Button')
      expect(button.id).toBe('test-id')
    })
  })
  it('Should onClick called', async () => {
    await act(async () => {
      fireEvent.click(button)
    })
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  it('Should Render as primary button', async () => {
    await waitFor(() => {
      expect(button).toHaveClass('btn btn-primary')
    })
  })
  it('Should Render as secondary button', async () => {
    renderResult.unmount()
    renderResult = render(<Button />)
    button = renderResult.getByLabelText('button')
    await waitFor(() => {
      expect(button).toHaveClass('btn btn-secondary')
    })
  })
})
