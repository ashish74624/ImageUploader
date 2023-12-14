import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FolderPage from "./pages/FolderPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import HowItWorks from "./pages/HowItWorks";

function App() {

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path="/folder/:email/:folderName" element={<FolderPage/>}/>
          <Route path="/howItWorks" element={<HowItWorks/>}/>
        </Routes>
      </ThemeProvider>
    </Router>
    
  );
}

export default App;
