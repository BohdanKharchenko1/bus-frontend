import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeTable from "./components/partials/HomeTable";
import BookingWizard from "./components/booking/BookingWizard.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BookingWizard/>
  </StrictMode>,
)
