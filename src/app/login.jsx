import React, { useState } from 'react'
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { useAuth } from '../context/authContext'

export default function LoginScreen() {

    const { login, register } = useAuth();

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [esLogin, setEsLogin] = useState(true)

    const handleSubmit = () => {
        if(esLogin){
            login(usuario, password)
        }else{
            register(usuario, email, password)
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esLogin ? 'Login' : 'Register'}</Text>
            <Text>Usuario: </Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu Usuario'
                value={usuario}
                onChangeText={setUsuario}
            />
            {
                !esLogin && (
                    <>
                        <Text>Email: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ingresa tu Email'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </>
                )
            }
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu Contraseña'
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.register}>
            <Button title={esLogin ? 'Login' : 'Register' } onPress={handleSubmit} />
            </View>
            <View>
                <Text>{esLogin ? "No tienes cuenta? Registrate" : 'Ya tienes cuenta? logeate'}</Text>
                <Switch value={esLogin} onValueChange={setEsLogin}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    register:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    }
})
