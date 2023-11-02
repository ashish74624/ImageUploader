import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FolderPage from "./pages/FolderPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";

function App() {

  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path="/folder/:email/:folderName" element={<FolderPage/>}/>
        </Routes>
      </ThemeProvider>
    </Router>
    
  );
}

export default App;
