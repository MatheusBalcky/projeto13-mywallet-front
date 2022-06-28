import './styles/App.css';
import RegisterPage from './components/registerPage';
import LoginPage from './components/loginPage';
import userDataContext from './context/userData';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <BrowserRouter>

      <userDataContext.Provider value={{ userData, setUserData}} >

      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>

      </userDataContext.Provider>

    </BrowserRouter>
  );
}

export default App;
