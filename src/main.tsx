import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pixie from './Pixie';
import { TooltipProvider } from '@/components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider>
      <Pixie />
    </TooltipProvider>
  </React.StrictMode>
);
