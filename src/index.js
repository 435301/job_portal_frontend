import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/lib/animate/animate.css';
import './assets/lib/owlcarousel/assets/owl.carousel.min.css';
import './assets/lib/lightbox/css/lightbox.min.css';
import './assets/css/style.css';
import './assets/css/admin.css';
import { Provider } from "react-redux";
import { store } from "../src/redux/store.tsx";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
