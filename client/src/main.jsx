import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx';
import RootLayout from './layout/RootLayout.jsx';
import DemoLogin from './pages/DemoLogin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/om-oss' element={<About />} />
            <Route path='/login' element={<DemoLogin />} />
            <Route path='*' element={<section><h1>Sidan hittades inte.</h1></section>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
