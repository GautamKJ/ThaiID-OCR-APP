
import './App.css';
import {BrowserRouter , Route,Routes} from "react-router-dom";
import Homepage from './Component/Homepage';
import View from './Component/View';
import Sidebar from './Component/Sidebar';


function App() {
  return (
    <>
    
      <div>
    <BrowserRouter>
       
    <Sidebar/>
       <Routes>
       
       < Route  path="/" element={<Homepage/>}/> 
       < Route  path="/dashboard" element={<Homepage/>}/> 
       {/* < Route  path="/history" element={<History/>}/>  */}
        < Route exact path="/view" element={<View/>}/> 
        </Routes>
        
        </BrowserRouter>
        </div>
    
      
    </>
  );
}

export default App;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMjVlZDBiYTItODA1MC00NDM2LTliYjMtYjkzZWY5OGIzNDc4In0.QljcaGAFZhY4hb_Ize8NWqeBUmR10tQviBP5T946a2w