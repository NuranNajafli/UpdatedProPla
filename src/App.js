import './App.css';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import AdminPanel from './components/AdminForm';
import DataTable from './components/DataTable';
import User from "./components/adminList/User"
import { useEffect, } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../src/components/interceptors/axios"

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    sendRequest();
  }, [])
  const sendRequest = async () => {

    const token = localStorage?.getItem('token')
    if (token) {
      try {
        const res = await axios.post(`Log/verify?token=${token}`)

        if (res.data) {
          axios.defaults.headers.common['Authorization']='bearer '+ localStorage?.token
          }
      } catch (error) {
        localStorage.removeItem('token')
        navigate('/')
      }
    }
    else {
      navigate('/')
    }
  }

 
  return (
    <div>
      <Routes >
        <Route path="/" >
          <Route index element={<Login />} />

          <Route path="home" >
            <Route index element={<Home />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>

          <Route path="dataTable">
            <Route index element={<DataTable />} />
            <Route path=":id" element={<AdminPanel />} />
            <Route path=":id/user" element={<User />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
