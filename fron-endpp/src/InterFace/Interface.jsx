import { TradingCard } from '../TradingCard/TradeCarg'
import { useState, useEffect } from 'react';
import estilos from './interface.module.css';


export function Interface(){
    
    
    const [users, setUsers] = useState([]);
    
    
    

    const PokemonList=()=>{
      fetch('http://192.168.1.4/ApiEntidadBancaria/Usuario/all')
         
          

      .then(function(response) {
        return response.json();
      })
    .then(function(texto) {
      
      setUsers(texto) ; 
      
      

    });
    };


   
    

    

    useEffect(() => {
      PokemonList();
  }, []);
      
          
      

     
      return (
        <table className={estilos.usertable}>

        <thead className={estilos.thead}>
          <tr>
            <td>Nombre</td>
            <td>Apellido</td>
          </tr>
        </thead>

        
        {
        users.map((userData) =>
         <TradingCard Textname={userData.nombre} DescriptionName={userData.apellido} edad={userData.edad}></TradingCard>
         )
        }



        </table>
        
       
       
        
        
       
        

      )
}
