import React, { useReducer } from 'react'
import Contexto from './Contexto.jsx'
import MiReducer from './MiReducer.jsx'
import types from './types.js'

const inicio = () => {
    const sesion = JSON.parse(localStorage.getItem("usuario"));
    return {
        logueado: !!sesion,
        usuario: typeof  sesion != "object" ? JSON.parse(sesion) : sesion 
    };
};

const Provider = ({children}) => {
    const [logeado,dispatch] = useReducer(MiReducer,{},inicio);

    const login = (datos) => {
        localStorage.setItem("usuario",JSON.stringify(datos));
        const action = {
            type: types.login,
            usuario: datos
        }
        dispatch(action);
    }
    const cerrar_sesion = () => {
        const action = {
            type: types.logout,
            usuario: {}
        }
        localStorage.removeItem("usuario");
        dispatch(action);
    }
  return (
    <Contexto.Provider value={{...logeado,login,cerrar_sesion}}>
            {children}
    </Contexto.Provider>
  )
}

export default Provider