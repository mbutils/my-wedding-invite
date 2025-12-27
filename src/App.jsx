import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'antd/dist/reset.css'
import WeddingPage from './pages/WeddingPage/WeddingPage'
import WeddingInvite from './pages/WeddingInvite/WeddingInvite'
import GuidePage from './pages/Guide/Guide'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/kinhmoi" element={<WeddingInvite />} />
        <Route path="/kinhmoi/:guest" element={<WeddingInvite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
