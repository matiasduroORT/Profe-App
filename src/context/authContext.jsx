import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';


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

                const compatible = await LocalAuthentication.hasHardwareAsync()

                const enrolled = await LocalAuthentication.isEnrolledAsync();

                if( compatible && enrolled){
                    const results = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Verifica tu identidad',
                        fallbackLabel: "Usar contrasenia",
                        cancelLabel: "Cancelar"
                    })

                    if(results.success){
                        setUser(JSON.parse(userData))
                        setStatus('authenticated');
                        setIsAuth(true)
                    }else{
                        alert('Authenticacion cancelada o fallida')
                        await AsyncStorage.removeItem("isAuthenticated")
                        await AsyncStorage.removeItem("userData")
                        setStatus('unauthenticated')
                        setIsAuth(false)
                    }
                }else{
                    console.log("Biometria no encontrada");
                    
                    setUser(JSON.parse(userData))
                    setStatus('authenticated');
                    setIsAuth(true)
                }

            }else{
                setStatus('unauthenticated')
                setIsAuth(false)
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


    const register = async ({usuario, email, password}) => {
        try {
            const response = await fetch('https://6823c65165ba05803397d99f.mockapi.io/users');
            const data = await response.json()
            
            const userExist = data.some( u => u.usuario === usuario);
            const emailExist = data.some( u => u.email === email);
      
            if(userExist){
              alert('Usuario ya registrado')
            }
            else if(emailExist){
              alert('Email ya registrado')
            }
            else{

        const body = JSON.stringify({
            email:email,
            username:usuario,
            password:password,
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
} catch (error) {
    console.error(error)
    alert('Error en la autenticacion')
  }
}



    const logout = () => setIsAuth(false)

    return (
        <AuthContext.Provider value={{isAuth, login, logout, register, user}}>
            {children}
        </AuthContext.Provider>
    )
}