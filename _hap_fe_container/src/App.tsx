import i18next from 'i18next'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppRoute from './remote/common/routes/appRoute'
const App = () => {
  const handleError = (error: any, errorInfo: any) => {
    // handle error
    console.log(error, errorInfo)
  }

  const isRTL = i18next.dir() === 'rtl'
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      <div className="App" dir={isRTL ? 'rtl' : 'ltr'} data-testid="app">
        <React.Suspense fallback="">
          <AppRoute />
        </React.Suspense>
      </div>
    </ErrorBoundary>
  )
}

// Provide a fallback UI for the ErrorBoundary component
function ErrorFallback() {
  return <div>Something went wrong.</div>
}

export default App
