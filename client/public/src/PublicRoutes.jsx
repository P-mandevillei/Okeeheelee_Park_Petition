import { useEffect } from "react"
import CommonHomepage from "./components/pages/CommonHomepage"
import Details from "./components/pages/Details"
import PublicHomepage from "./components/pages/PublicHomepage"
import PublicLanding from "./components/pages/PublicLanding"
import Signature from "./components/pages/Signature"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

function ScrollToTop() {
  const path = useLocation();
  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [path]);

  return null;
}

function PublicRoutes() {
  return <>
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<CommonHomepage />}>
        <Route index element={<PublicHomepage />} />
        <Route path='contribute' element={<Signature />} />
        <Route path='details' element={<Details />} />
        <Route path="*" element={<PublicLanding />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </>
}

export default PublicRoutes