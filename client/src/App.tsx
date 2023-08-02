import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Folder from './pages/Folder';
import FolderPage from "./pages/FolderPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/folder' element={<Folder/>}/>
        <Route path="/folder/:folderName" element={<FolderPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
