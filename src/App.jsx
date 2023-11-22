import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./layout/AdminRoute";
import Users from './pages/Users';
import Products from './pages/Products';
import Warehouse from './pages/Warehouse';
import Stocklevel from './pages/Stocklevel';
import Stockmovement from './pages/Stockmovements';
import Loginpage from "./pages/Loginpage";
// import Godwon from "./pages/Godwon";
import Productlevel from "./pages/Productlevel";



function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<AdminRoute />}>
            <Route path="/users" element={<Users/>}  />
            <Route path="/products" element={<Products/>}  />
            {/* <Route path="/godown" element={<Godwon/>}  /> */}
            <Route path="/productlevel/:id" element={<Productlevel/>}/>
            <Route path="/warehouse" element={<Warehouse/>}  />
            <Route path="/stocklevel/:id" element={<Stocklevel/>}  />
            <Route path="/stockmovement" element={<Stockmovement/>}  />
            
          </Route>

          <Route path="/login" element={<Loginpage />} />
        </Routes>
        </Router>
    </>
  );
}

export default App;
