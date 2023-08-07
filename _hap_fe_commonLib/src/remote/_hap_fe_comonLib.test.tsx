import { RenderResult, cleanup, render, waitFor } from '@testing-library/react'
import React from 'react'
import _hap_fe_commonlib from './_hap_fe_commonLib'

let renderResult: RenderResult

describe('_hap_fe_commonLib', () => {
  beforeEach(() => {
    renderResult = render(<_hap_fe_commonlib />)
  })
  afterAll(() => cleanup())

  test('Should render without crash', async () => {
    await waitFor(() => {
      expect(renderResult.getByLabelText('remote')).toBeInTheDocument()
    })
  })
})
