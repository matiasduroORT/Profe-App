import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(null)
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('checking') // haya 3 tipos de estados, checking, authenticado y unauthenticated

    useEffect(() => {
      
        const cargarEstadoAuth = async() => {

            const isAuthenticated = await AsyncStorage.getItem("isAuthenticated")
            const userData = await AsyncStorage.getItem('userData')

            if(isAuthenticated === 'true' && userData){
                setUser(JSON.parse(userData))
                setStatus('authenticated');
            }else{
                setStatus('unauthenticated')
            }
        }
 
        cargarEstadoAuth()
    }, [])
    



    const login = async (usuario, password) => {
        try {
            console.log('Iniciando Login');
            
            const response = await fetch('https://6823c65165ba05803397d99f.mockapi.io/users');
            const data = await response.json()
            console.log('Data: ', data);

            const user = data.find(u => u.username === usuario && u.password === password);
            console.log("Usuario?: ", user);
            
            if(user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                await AsyncStorage.setItem('userData', JSON.stringify(user))
                setUser(user)
                setIsAuth(true)
                setStatus('authenticated')
            }else{
                alert('Usuario o password incorrectos')
                setStatus('unauthenticated')
            }
        } catch (error) {
            console.error(error)
            alert('Error en la authenticacion')
            setStatus('unauthenticated')
        }
    }


    const register = () => {
        // Primero hacer un fetch, similar al de login, para verificar si ya hay un usuario registrado con ese email o username
        // en caso de que lo haya, disparar un alert


        // hacer la peticion post a la misma url

        const body = JSON.stringify({
            email:"",
            username:"",
            password:"",
            avatar:""
        })


        const respuesta = await fetch('https://6823c65165ba05803397d99f.mockapi.io/users',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                body: body
            }}
        )

        if(respuesta.ok){
            alert('Registro Exitoso')
        }else{
            alert('Error al registrar el usuario')
        }
    }



    const logout = () => setIsAuth(false)

    return (
        <AuthContext.Provider value={{isAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}