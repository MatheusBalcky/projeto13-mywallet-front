import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login (e){
        e.preventDefault();
        console.log('enviou')
    }

    return (
        <Background>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)} 
                placeholder='E-mail'/>
                <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)}
                placeholder='Senha'/>
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
    }

    p{
        color: white;
        font-weight: bold;
        &:hover{
            text-decoration: underline;
        }
    }
`