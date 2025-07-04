import { StrictMode } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'keen-slider/keen-slider.min.css';
import { createRoot } from 'react-dom/client';

import App from './app/app';
import Providers from './app/providers';
import './index.css';
import './transition.css';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Providers>
         <App />
      </Providers>
   </StrictMode>
);
