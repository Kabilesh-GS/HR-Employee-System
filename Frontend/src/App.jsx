import { Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </div>
  )
}

export default App