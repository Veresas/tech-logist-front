import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages';
import { AuthWrapper } from "./wrappers"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          {/* Защищенные маршруты */}
          <Route element={<AuthWrapper />}>
          
          
          </Route>
        </Routes>
        <Route path="*" element={<div>404 Not Found</div>} />
    </BrowserRouter>

  </>
  )
}

export default App
//          <Route path='/' element={<MainPage />} />