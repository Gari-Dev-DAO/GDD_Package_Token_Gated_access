import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PubForm from './component/PubForm';
import PubContentInput from './component/PubContentInput';
import SubContent from './component/SubContent';
import { WalletConnectProvider } from './component/WalletContext';
import '@solana/wallet-adapter-react-ui/styles.css'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/pub/form',
    element: <PubForm />,
  },
  {
    path: '/pub/add',
    element: <PubContentInput />,
  },
  {
    path: '/sub/content',
    element: <SubContent />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WalletConnectProvider>
    <RouterProvider router={router} />
    </WalletConnectProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//todo now make a data be attached to the console.
