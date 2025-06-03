import { Stack, useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/authContext'
import { ProductProvider } from '../context/productContext'
import { SedeProvider } from '../context/sedeContext'

function ProtectedLayout() {

  const {isAuth} = useAuth()

  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {

    if(isAuth === null) return;

    const inAuthGroup = segments[0] === 'login'

    if(!isAuth && !inAuthGroup){
      router.replace('/login')
    }else if(isAuth && inAuthGroup){
      router.replace('/(tabs)')
    }

    console.log("segments: ", segments);
    
    
  }, [isAuth, segments])
  

  return <Stack
    screenOptions={{
        headerShown: false,
    }}
  />
}


export default function LayoutPrincipal(){
  return (
    <AuthProvider>
      <ProductProvider>
        <SedeProvider>
          <ProtectedLayout/>  
        </SedeProvider>
      </ProductProvider>
    </AuthProvider>
  )
}