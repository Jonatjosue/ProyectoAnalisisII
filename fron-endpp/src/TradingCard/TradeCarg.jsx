import { useEffect } from 'react';
import TradeStilos from './TradeCard.module.css';


export function TradingCard({Textname,DescriptionName,edad}){

   
    

    return (
        <>
        <tr className={TradeStilos.trusers}>
            <td>{Textname}</td>
            <td>{DescriptionName}</td>
            <td>{edad}</td>
        </tr>
        </>
    )
}