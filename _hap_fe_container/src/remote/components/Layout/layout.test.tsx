
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Layout from '.'

describe('App', () => {
  it('renders without crashing', async () => {
    render(
        <Layout />
    )
    const appElement = screen.getByTestId('app')
    await waitFor(() => expect(appElement).toBeInTheDocument())
  })
})
