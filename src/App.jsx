import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'antd/dist/reset.css'
import GuidePage from './pages/guide-page'
import TestGsap from './pages/guide-page/TestGsap'
import DamNgo from './pages/dam-ngo'
import AdminPage from './pages/admin-page'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestGsap />} />
        <Route path="/cupid" element={<AdminPage />} />
        <Route path="/damngo" element={<DamNgo />} />
        <Route path="/guide" element={<GuidePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
