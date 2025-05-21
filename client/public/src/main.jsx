import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PublicRoutes from './PublicRoutes'
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { googleRecaptchaClientKey } from '../../../paths/clientPaths';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={googleRecaptchaClientKey}>
      <PublicRoutes />
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
