import React from "react";
import '../hojas-de-estilos/Boton.css';

function Boton(props){

    const esOperador= (valor) =>{
        //isNaN(valor) se usa para validar si valor NO es un numero
         return isNaN(valor) && (valor !== '.') && (valor !== '±');
    };

    return(
         <div 
         className={`boton-contenedor ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}
         onClick={()=> props.manejarClic(props.children)}
         >
             {props.children}
         </div>
    );
}

export default Boton;