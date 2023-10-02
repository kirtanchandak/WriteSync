import './App.css'
import { useEffect } from 'react';
import { userState } from './store/atoms/user';
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Document from './pages/Documents';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

function App() {

  return (
    <>
      <InitUser />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/documents' element={<Document />}></Route>
      </Routes>
    </>
  )
}

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.username) {
        setUser({ isLoading: false, userEmail: res.data.username });
      } else {
        setUser({ isLoading: false, userEmail: null });
      }
    } catch (e) {
      console.log("error");
      setUser({ isLoading: false, userEmail: null });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>;
};

export default App;
