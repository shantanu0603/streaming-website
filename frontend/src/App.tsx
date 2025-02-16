import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VideoPlayer from './pages/VideoPlayer'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App 