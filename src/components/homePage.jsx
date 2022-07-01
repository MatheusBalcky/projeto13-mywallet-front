import styled from 'styled-components';
import tokenContext from '../context/tokenContext';
import userDataContext from '../context/userDataContext';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';



function HomePage (){
    const { userData, setUserData } = useContext(userDataContext);
    const { setToken } = useContext(tokenContext);
    const navigate = useNavigate();
    useEffect( () =>{
        if(!userData.name){
            navigate('/')
        }
    }, [userData, navigate]);

    



    
    function clickSignOut(){
        console.log('Deslogando');
        setUserData({});
        setToken('');
    }
    return (
        <Background>
            <header>
                <h1>Olá, {userData.name}</h1>
                <ion-icon onClick={clickSignOut} name="exit-outline"></ion-icon>
            </header>

            <div className="whiteBox">
                <div className="boxSpan">
                    <span>Não há registros de <br /> entrada ou saída</span>
                </div>

            </div>
            
            <div className="options">

                <Link to='/newEnter'>
                    <div className="enter">
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Nova<br />entrada</span>
                    </div>
                </Link>

                <div className="out">
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <span>Nova<br />saída</span>
                </div>

            </div>

        </Background>
        
    )
}





export default HomePage;


// & CSS COMPONENTS

const Background = styled.div`
    margin: 20px;
    display: flex; align-items: center;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    height: 94vh;


    header{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between; align-items: center;
        width: 100%;
        padding: 10px;

        h1 {
        color: white;
        font-size: 1.5em;
        font-family: 'Josefin Sans', sans-serif;
        font-weight: bold;
        }
        
        ion-icon[name='exit-outline']{
            color: white;
            font-size: 1.8em;
        }
    }

    .whiteBox{
        background-color: white;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        .boxSpan{
            display: flex; justify-content: center; align-items: center;
            width: 100%;
            height: 100%;

            span{
                text-align: center;
                font-size: 1.4em;
                filter: opacity(50%);
            }

        }
    }

    .options{
        box-sizing: border-box;
        padding: 0px 10px;
        display: flex; justify-content: space-between;
        width: 100%;
        gap: 20px;
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