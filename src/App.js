import './styles/App.css';
import RegisterPage from './components/registerPage';
import LoginPage from './components/loginPage';
import HomePage from './components/homePage';
import tokenContext from './context/tokenContext';
import userDataContext from './context/userDataContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <BrowserRouter>

      <tokenContext.Provider value={{ token, setToken}} >
      <userDataContext.Provider value={{ userData, setUserData}}>

      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/home' element={<HomePage/>} />
      </Routes>

      </userDataContext.Provider>
      </tokenContext.Provider>

    </BrowserRouter>
  );
}

export default App;
