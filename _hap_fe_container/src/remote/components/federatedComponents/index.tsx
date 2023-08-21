import React from 'react'
import { useFederatedComponent } from '@appblocks/js-sdk'

const Button = (props: any) => {
  const system = {
    url: process.env.BB_HAPPILEE_DEV_ELEMENTS_URL,
    scope: 'remotes',
    module: './Button',
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    system?.url,
    system?.scope,
    system?.module,
    React
  )

  return (
    <React.Suspense fallback={''}>
      {errorLoading ? `Error loading module "${module}"` : FederatedComponent && <FederatedComponent {...props} />}
    </React.Suspense>
  )
}
const Input = (props: any) => {
  const system = {
    url: process.env.BB_HAPPILEE_DEV_ELEMENTS_URL,
    scope: 'remotes',
    module: './Input',
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    system?.url,
    system?.scope,
    system?.module,
    React
  )

  return (
    <React.Suspense fallback={''}>
      {errorLoading ? `Error loading module "${module}"` : FederatedComponent && <FederatedComponent {...props} />}
    </React.Suspense>
  )
}

export { Button, Input }
