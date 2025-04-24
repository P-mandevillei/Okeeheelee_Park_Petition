import CommonHomepage from "./components/pages/CommonHomepage"
import Details from "./components/pages/Details"
import PublicHomepage from "./components/pages/PublicHomepage"
import PublicLanding from "./components/pages/PublicLanding"
import Signature from "./components/pages/Signature"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function PublicRoutes() {
  return <>
  <BrowserRouter>
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