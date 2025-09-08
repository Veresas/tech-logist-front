import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, MainPage, PrivatePage, BufferPage } from './pages';
import { AuthWrapper } from "./wrappers"
import {  } from './pages/BufferPages';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              {/* Публичные маршруты */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' element={<BufferPage />} />
              {/* Защищенные маршруты */}
              <Route element={<AuthWrapper />}>
                <Route path='/s/main' element={<MainPage />}/>
                <Route path='/s/cabinet' element={<PrivatePage />}/>
              </Route>
              
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
    </>
  )
}

export default App
