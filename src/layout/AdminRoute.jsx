
import React, {useContext , useEffect} from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet,useNavigate } from 'react-router-dom';




function AdminRoute() {
  // const { user } = useContext(ContextDatas);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     return navigate("/login");
  //   }
  // }, []);
  return (
    <div id="main-wrapper">
      <Header />
      <Sidebar />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminRoute