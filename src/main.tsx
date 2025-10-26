import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeTable from "./components/partials/HomeTable";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <HomeTable/>
  </StrictMode>,
)
