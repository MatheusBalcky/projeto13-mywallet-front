import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function register (e, navigate, name, email, password, passwordRepeat, setTextAlert){
    const URL = 'https://my-waallet.herokuapp.com/register';
    e.preventDefault();

    if((password !== passwordRepeat) || (password.length < 6 || passwordRepeat.length < 6)){
        setTextAlert('As senhas precisam ser iguais e no mínimo 6 caracteres !!!'); console.log('não registrou'); return;
    } else if (name.length < 4){
        setTextAlert('Nome precisa ter no mínimo 4 caractéres');  console.log('não registrou'); return;
    }
    setTextAlert('');
    
    const body = {
        name,
        email,
        password
    }

    const promise = axios.post(URL, body);
    promise
    .then( res =>{
        //console.log(res);
        alert('Conta criada com sucesso')
        navigate('/');
    })

    .catch( err => {
        setTextAlert(err.response.data)
    });
}

function RegisterPage (){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [textAlert, setTextAlert] = useState('');
    const navigate = useNavigate();
    
    return (
        <Background>

            <h1>MyWallet <br/> Registro</h1>

            <form onSubmit={(e) => { register(e, navigate,name, email, password, passwordRepeat, setTextAlert)}} >

                <input type="name" value={name} onChange={ (e) => setName(e.target.value)} 
                placeholder='Nome' required/>

                <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)}
                placeholder='E-mail' required/>

                <input type="password" value={password} onChange={ (e) =>{setPassword(e.target.value)}} 
                placeholder='Senha' required/>

                <input type="password" value={passwordRepeat} onChange={ (e) =>{setPasswordRepeat(e.target.value)}}
                placeholder='Confirma a senha' required/>
                <span>{textAlert}</span>

                <button>Cadastrar</button>
            </form>

            <Link to='/'>
                <p>Já tem uma conta?</p>
            </Link>

        </Background>
        
    )
}

export default RegisterPage;

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
        text-align: center;
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