import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pixie from './PixCell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PostHogProvider } from 'posthog-js/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
      }}
    >
      <TooltipProvider>
        <Pixie />
      </TooltipProvider>
    </PostHogProvider>
  </React.StrictMode>
);
