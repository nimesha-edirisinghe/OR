import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Fonts from './theme/Fonts';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'config/keyCloakAuth';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'state/store';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './theme/toastStyles.css';
import { NODE_ENV } from 'config/constants';
import { neutral_100, ocean_blue_600 } from 'theme/colors';
import reportWebVitals from 'reportWebVitals';

declare global {
  interface Window {
    Cypress: {};
    store: {};
  }
}

if (window.Cypress) {
  window.store = store;
}

const toastContainerConfig: ToastContainerProps = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  theme: 'dark'
};

if (NODE_ENV === 'development') {
  // const { worker } = require('./mocks/browser');
  // worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ChakraProvider theme={theme}>
    <Fonts />
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        checkLoginIframe: false
      }}
    >
      <React.StrictMode>
        <Provider store={store}>
          <App />
          <ToastContainer
            {...toastContainerConfig}
            toastStyle={{
              backgroundColor: ocean_blue_600,
              height: 'auto',
              width: '320px',
              color: neutral_100,
              marginBottom: '2px',
              top: '60px',
              fontSize: '12px',
              fontWeight: 400
            }}
          />
        </Provider>
      </React.StrictMode>
    </ReactKeycloakProvider>
  </ChakraProvider>
);

reportWebVitals(console.log);
