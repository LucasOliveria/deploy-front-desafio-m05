import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRouter from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import DashboardContextProvider from './contexts/dashboardContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DashboardContextProvider>
    <BrowserRouter>
      <MainRouter />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </DashboardContextProvider>

)
