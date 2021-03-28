import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from './App'

Sentry.init({
  dsn: 'https://5b84556a31a144afbdf23c91ebc361b6@o557105.ingest.sentry.io/5693473',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(<App />, document.getElementById('root'))
