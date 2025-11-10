import { Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import UserDetails from "./Components/userDetails"
import Adduser from "./Components/Adduser"

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/addUser" element={<Adduser />} />
        <Route path="/onGoingProjects" element={<p>projects going on</p>} />
      </Routes>
    </div>
  )
}

export default App