import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PublicRoutes from './PublicRoutes'
import "bootstrap/dist/css/bootstrap.min.css";
import { googleRecaptchaClientKey } from './clientPaths';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={googleRecaptchaClientKey}>
      <PublicRoutes />
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
