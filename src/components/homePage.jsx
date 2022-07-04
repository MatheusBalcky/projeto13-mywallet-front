import styled from 'styled-components';
import tokenContext from '../context/tokenContext';
import userDataContext from '../context/userDataContext';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const formatterMoney = new Intl.NumberFormat("pt-BR",{
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
});

function ValueListItem ({index, date, description, type, value,}){



    return (
        <li key={index}>
            <div>
                <div className="date">{dayjs(date).format('DD/MM')}</div>
                <div className="description">{description}</div>
            </div>

            <ValueNumber type={type}>
                {formatterMoney.format(parseFloat(value).toFixed(2))}
            </ValueNumber>
        </li>
    )
}

function HomePage (){
    const { userData, setUserData } = useContext(userDataContext);
    const { token, setToken } = useContext(tokenContext);
    const [ insAndOuts, setInsAndOuts ] = useState([]);
    const [disableBalance, setDisableBalance] = useState(true);
    const [totalValue, setTotalValue] = useState(0);

    const navigate = useNavigate();

    useEffect( () =>{
        if(!userData.name){
            navigate('/')
        }
    }, [userData, navigate]);

    
    useEffect( () =>{
        const URL = 'http://localhost:5000/home';
        const promise = axios.get(URL, { headers: { Authorization: token } });

        promise
        .then ( (res)=>{
            if(res.data.length === 0){
                setInsAndOuts(<div className="boxSpan"> <span>Não há registros de <br /> entrada ou saída</span> </div>);
                return
            }
            setDisableBalance(false)
            dealValues(res.data.reverse());
            plusValues(res.data)  
        })

        .catch( err => {
            console.log(err)
        })
    }, [token]);


    function dealValues (values){
        const result = values.map( (item, index) =>
        <ValueListItem
        key={index}
        date={item.date}
        description={item.description}
        type={item.type}
        value={item.value} />)

        setInsAndOuts(result);
    }

    function clickSignOut(){
        console.log('Deslogando');
        setUserData({});
        setToken('');
    }

    function plusValues (values){
        let result = 0;
        const valuesReverted = values.reverse();

        for(let i = 0; i < valuesReverted.length; i++){
            if(valuesReverted[i].type === 'enter'){
                result+= parseFloat(valuesReverted[i].value);
                continue
            }
            result-= parseFloat(valuesReverted[i].value);
        }
        
        setTotalValue(result.toFixed(2))
    }
    
    return (
        <Background>
            <header>
                <h1>Olá, {userData.name}</h1>
                <ion-icon onClick={clickSignOut} name="exit-outline"></ion-icon>
            </header>

            <WhiteBox>
                <ListValues>
                    {insAndOuts}
                </ListValues>

                <BalanceFooter totalValue={totalValue} disable={disableBalance}>
                    <div className="balance">SALDO</div>
                    <div className="money">{formatterMoney.format(totalValue)}</div>
                </BalanceFooter>

            </WhiteBox>

            
            <OptionsFooter>

                <Link className="enter" to='/newEnter'>
                    <div className="enter">
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Nova<br />entrada</span>
                    </div>
                </Link>


                <Link className="out" to='/newOut'>
                    <div className="out">
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>Nova<br />saída</span>
                    </div>
                </Link>

            </OptionsFooter>

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
            cursor: pointer;
        }
    }
`

const OptionsFooter = styled.div`
 
    box-sizing: border-box;
    padding: 0px 10px;
    display: flex; justify-content: space-between;
    width: 100%;
    gap: 20px;
    
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

const BalanceFooter = styled.div`
    box-sizing: border-box;
    padding: 17px;
    display: ${props => props.disable ? "none": "flex"};
    justify-content: space-between; align-items: center;
    width: 100%;

    .balance {
        font-weight: bold;
        font-size: 1.2em;
    }

    .money {
        font-size: 1.2em;
        font-weight: bold;
        color: ${props => props.totalValue < 0 ? "red": "green"};
    }
`

const ValueNumber = styled.div`
    color: ${ props => props.type === 'enter'? 'green':'red'};
`

const WhiteBox = styled.div`
    display: flex; flex-direction: column; justify-content: space-between;
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
`

const ListValues = styled.ol`
    
    box-sizing: border-box;
    margin: 18px;
    display: flex; flex-direction: column;
    gap: 10px;
    
    li{
        font-size: 1.2em;
        display: flex; justify-content: space-between;

        div{
            display: flex; gap: 15px;
        }
    }

    .date{
        filter: opacity(30%);
    }
    
`