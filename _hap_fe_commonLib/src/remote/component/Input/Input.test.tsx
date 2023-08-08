import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react'
import { Input } from './Input'
import React from 'react'
import { act } from 'react-dom/test-utils'

let renderResult: RenderResult
let input: HTMLInputElement
let label: HTMLLabelElement
let span: HTMLSpanElement
describe('Input', () => {
  beforeEach(() => {
    renderResult = render(
      <Input label="input-label" aria-label="input" name="input" id="input" placeHolder="enter input" error="error" />
    )
    input = renderResult.getByLabelText('input')
    label = renderResult.getByLabelText('label')
    span = renderResult.getByLabelText('error')
  })
  it('Should render without crashing', async () => {
    await waitFor(() => {
      expect(input).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(span).toBeInTheDocument()
    })
  })

  it('Should have a placeHolder text', async () => {
    await waitFor(() => {
      expect(renderResult.getByPlaceholderText('enter input')).toBeInTheDocument()
    })
  })
  it('Should have a id and name', async () => {
    await waitFor(() => {
      expect(input.id).toBe('input')
      expect(input.name).toBe('input')
    })
  })
  it('Should label have a htmlFor', () => {
    expect(label.htmlFor).toBe('input')
  })
  it('Should have a label text', async () => {
    await waitFor(() => {
      expect(label.innerHTML).toBe('input-label')
    })
  })
  it('Should have a span text', async () => {
    await waitFor(() => {
      expect(span.innerHTML).toBe('error')
    })
  })
  it('Onchange event ', async () => {
    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: 'test1',
        },
      })
    })
    await waitFor(() => {
      expect(input.value).toBe('test1')
    })
  })
})
