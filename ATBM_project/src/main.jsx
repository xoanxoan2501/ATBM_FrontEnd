import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import theme from './theme.jsx';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { MyProvider } from './hooks/MyProvider.jsx';
createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <MyProvider>
        <App />
      </MyProvider>
    </CssVarsProvider>
  </>
);
