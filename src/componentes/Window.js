import React from 'react';
import '../hojas-de-estilos/Window.css';

export function Window({input,resultado}){
    return(
        <div className='window'>
             <PantallaResultado resultado={resultado} />
            <Pantalla input={input}/>
           
        </div>
    );
    }
export function Pantalla({input}){
    return(
        <div className='pantalla'>
            {input}
        </div>
    );
}

export function PantallaResultado({resultado}){
    return(
        <div className='pantallaResultado'>
            {resultado}
        </div>
    );
}