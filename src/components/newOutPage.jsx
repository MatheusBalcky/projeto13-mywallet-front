import styled from "styled-components"
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import NumberFormat from 'react-number-format';
import tokenContext from '../context/tokenContext';
import axios from "axios";


function NewOutPage (){
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useContext(tokenContext);

    const body = {
        value,
        description
    }

    function sendOut(e){
        e.preventDefault();
        const URL = 'https://my-waallet.herokuapp.com/newOut';
        const promise = axios.put(URL, body, {headers: { Authorization: `${token}`}});
        
        promise.then( res => {
            alert('Valor salvo com sucesso')
            navigate('/home');
        })
        .catch( err => {
            alert('Valor não foi salvo com exito')
            console.log(err)
        })
    }

    return (
        <Background>
            <header>
                <h1>Nova Saída</h1>
            </header>
            
            <form onSubmit={(e) => sendOut(e)} >
                
                <NumberFormat
                    isNumericString={true}
                    value={value}
                    displayType={'input'}
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix={'R$'}
                    onValueChange={(values) => {
                        const { value } = values;
                        setValue(value)
                    }}
                />

                <input type="text" placeholder="Descrição" value={description}
                onChange={ e => setDescription(e.target.value)}   
                required/>

                <button>Salvar Saída</button>
            </form>
        </Background>
    )
}

export default NewOutPage;

// & CSS COMPONENTS

const Background = styled.div`
    margin: 20px;
    display: flex; align-items: center;
    flex-direction: column;
    gap: 10px;
    height: 94vh;

    form {
        width: 95%;
        display: flex; flex-direction: column;
        gap: 10px;

        input {
            font-size: 1.1em;
            border-radius: 5px;
            padding: 15px 10px;
            border: none;
        }
        button {
            font-weight: bold;
            font-size: 1.2em;
            color: white;
            background-color: #9648bd;
            border-radius: 5px;
            padding: 10px;
            border: none;
            box-shadow: 0px 0px 5px 5px #2e2e2e16;
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

    header{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between; align-items: center;
        width: 100%;
        padding: 10px;

        h1 {
        color: white;
        font-size: 1.8em;
        font-family: 'Josefin Sans', sans-serif;
        font-weight: bold;
        }
        
        ion-icon[name='exit-outline']{
            color: white;
            font-size: 1.8em;
        }
    }

    .enter, .out{
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        display: flex; flex-direction: column; justify-content: space-between;
        background-color: #A328D6;
        height: 100px;
        width: 100%;
        ion-icon[name='add-circle-outline'], ion-icon[name='remove-circle-outline']{
            color: white;
            font-size: 1.5em;
        }
        span{
            color: white;
            font-size: 1.1em;
            font-weight: bold;
        }
    }

`

