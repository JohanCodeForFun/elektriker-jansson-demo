import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import Home from './pages/Home.jsx'
import Hello from './pages/Hello.jsx';
import About from './pages/About.jsx';
import RootLayout from './layout/RootLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/om-oss' element={<About />} />
          <Route path='/hello/:name' element={<Hello />} />
          <Route path='*' element={<section><h1>Sidan hittades inte.</h1></section>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
