import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import FolderPage from "./pages/FolderPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/folder/:folderName" element={<FolderPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
