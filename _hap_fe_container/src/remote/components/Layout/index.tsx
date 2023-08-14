import React from 'react'
import { Button } from '../federatedComponents'

interface LayoutProps {
  label?: string
}

export const Layout: React.FC<LayoutProps> = ({ label = 'test' }) => {
  return (
    <div className="bg-fuchsia-500">
      <p data-testid="app">Hello World {label} </p>
      <Button label="click me " className="bg-red-500  w-[25rem] h-[25rem]" />
    </div>
  )
}

export default Layout
