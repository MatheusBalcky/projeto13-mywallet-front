import styled from 'styled-components';
import axios from 'axios';
import tokenContext from '../context/tokenContext';
import userDataContext from '../context/userDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';


function login (e, navigate, email, password, setTextAlert, setToken, setUserData){
    const URL = 'http://localhost:5000/login';
    e.preventDefault();

    if(  email.length === 0 || password.length === 0 ){  
         setTextAlert('Preencha os campos corretamente'); return;
    } else if (password.length < 6){
        setTextAlert('E-mail ou senha incorretos!'); return
    }
    setTextAlert('');
    
    const body = {
        email,
        password
    }

    const promise = axios.post(URL, body);
    promise
    .then( res =>{
        setToken(res.data.token);
        setUserData(res.data.user)
        //alert('logado com sucesso');
        navigate('/home');
    })

    .catch( err => {
        setTextAlert(err.response.data)
    });
}

function LoginPage (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [textAlert, setTextAlert] = useState('');
    const { setToken } = useContext(tokenContext);
    const { setUserData } = useContext(userDataContext)
    const navigate = useNavigate();


    return (
        <Background>
            <h1>MyWallet</h1>

            <form onSubmit={ e => login(e, navigate, email, password, setTextAlert, setToken, setUserData)} >

                <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)} 
                placeholder='E-mail' required/>

                <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)}
                placeholder='Senha' required/>

                <span>{textAlert}</span>

                <button>Entrar</button>
            </form>

            <Link to='/register'>
                <p>Primeira vez? Cadastra-se!</p>
            </Link>
            
        </Background>
        
    )
}

export default LoginPage;



// & CSS COMPONENTS

const Background = styled.div`
    display: flex; justify-content: center; align-items: center;
    flex-direction: column;
    height: 99.8vh;
    gap: 50px;
    

    h1 {
        color: white;
        font-size: 2.5em;
        font-family: 'Josefin Sans', sans-serif;
    }

    form {
        width: 80%;
        display: flex; flex-direction: column;
        gap: 10px;

        input {
            font-size: 1.1em;
            border-radius: 10px;
            padding: 15px 10px;
            border: none;
        }
        button {
            font-weight: bold;
            font-size: 1.2em;
            color: white;
            background-color: #9648bd;
            border-radius: 10px;
            padding: 10px;
            border: none;
            box-shadow: 0px 0px 10px 1px #00000028;
            cursor: pointer;
            &:hover{
                background-color: #945daf;
            }
        }
        span{
            transition: all;
            color: white;
            font-weight: bold;
            animation: flicking 1s infinite forwards;
        }
        @keyframes flicking {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(3px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    }

    p{
        color: white;
        font-weight: bold;
        &:hover{
            text-decoration: underline;
        }
    }
`