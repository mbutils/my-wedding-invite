import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'antd/dist/reset.css'
import WeddingPage from './pages/WeddingPage/WeddingPage'
import WeddingInvite from './pages/WeddingInvite/WeddingInvite'
import Admin from './pages/Admin/Admin'
import GuidePage from './pages/Guide/Guide'
import TestGsap from './pages/Guide/TestGsap'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/test" element={<TestGsap />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/kinhmoi" element={<WeddingInvite />} />
        <Route path="/kinhmoi/:guest" element={<WeddingInvite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
