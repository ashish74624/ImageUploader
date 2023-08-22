import { BrowserRouter as Router, Routes, Route ,useLocation } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import FolderPage from "./FolderPage";
import Navbar from "../components/Navbar";

export default function Landing() {

  const location = useLocation();

  const isRegister : boolean = location.pathname === '/register'

  return (
    <Router>
      { !isRegister && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/folder/:folderName" element={<FolderPage/>}/>
      </Routes>
    </Router>
  )
}
