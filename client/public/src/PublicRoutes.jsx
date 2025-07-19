import { useEffect, Suspense, lazy, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import CommonHomepage from "./components/pages/CommonHomepage"
import Loading from "./Loading"
import ScreenWidthContext from "./components/contexts/ScreenWidthContext"

const Details = lazy( () => import("./components/pages/Details"))
const PublicHomepage = lazy( () => import("./components/pages/PublicHomepage"))
const PublicLanding = lazy( () => import("./components/pages/PublicLanding"))
const Signature = lazy( () => import("./components/pages/Signature"))

function ScrollToTop() {
  const path = useLocation();
  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [path]);

  return null;
}

function PublicRoutes() {
  const [screenW, setScreenW] = useState(window.innerWidth);
  useEffect(() => {
    const resize = () => {
      setScreenW(window.innerWidth);
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);
  
  return <>
  <BrowserRouter>
    <ScrollToTop />
    <ScreenWidthContext.Provider value={[screenW, setScreenW]}>
      
      <Routes>
        <Route path='/' element={<CommonHomepage />}>
        
          <Route index element={ <Suspense fallback={<Loading />}> <PublicHomepage /> </Suspense> } />
          <Route path='contribute' element={ <Suspense fallback={<Loading />}> <Signature /> </Suspense>} />
          <Route path='details' element={<Suspense fallback={<Loading />}> <Details /> </Suspense>} />
          <Route path="*" element={<Suspense fallback={<Loading />}> <PublicLanding /> </Suspense>} />
                
        </Route>
      </Routes>
    
    </ScreenWidthContext.Provider>
  </BrowserRouter>
  </>
}

export default PublicRoutes