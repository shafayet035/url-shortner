import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { ThemeProvider } from './context/Theme.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/User.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
          <Toaster />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
