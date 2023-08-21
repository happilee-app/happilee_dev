import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'
import AppRoute from './remote/common/routes/appRoute'
import i18n from './remote/i18n'
const App = () => {
  const handleError = (error: any, errorInfo: any) => {
    // handle error
    console.log(error, errorInfo)
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      <I18nextProvider i18n={i18n}>
        <div className="App" data-testid="app" translate="yes">
          <React.Suspense fallback="">
            <AppRoute />
          </React.Suspense>
        </div>
      </I18nextProvider>
    </ErrorBoundary>
  )
}

// Provide a fallback UI for the ErrorBoundary component
function ErrorFallback() {
  return <div>Something went wrong.</div>
}

export default App
