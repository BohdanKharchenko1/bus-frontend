import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeTable from "./components/partials/HomeTable";
import Navbar from "./components/partials/Navbar.tsx";
import PromoSection from "./components/partials/PromoSection.tsx";
import SearchForm from "./components/partials/SearchForm.tsx";
import Table from "./components/partials/Table.tsx";
import Footer from "./components/partials/Footer.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <HomeTable/>
   <Navbar/>
      <SearchForm />
    <Table />
      <PromoSection/>
      <Footer/>
  </StrictMode>,
)
