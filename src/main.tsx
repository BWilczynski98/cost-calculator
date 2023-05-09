import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n/i18n'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)
