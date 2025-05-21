import React, { useState } from 'react'
import { Alert, Button, Platform, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

export default function demo() {

    const [inputValue, setInputValue] = useState('')

    const handleShowAlert = () => {

        const mensaje = Platform.OS === 'ios' ? 'Estas usando iOS' : 'Estas usando Android'

        Alert.alert('Sistema Detectado', mensaje);
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Demo con varios Componentes</Text>
        <TextInput
            style={styles.input}
            placeholder='Escribir algo...'
            value={inputValue}
            onChangeText={setInputValue}
        />

        <Button title='Mostrar Alerta' onPress={handleShowAlert}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f0f0f0'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20
    },
    title: {
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      backgroundColor: 'white'
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 30,
      borderRadius: 10,
      alignItems: 'center'
    },
    modalText: {
      fontSize: 18,
      marginVertical: 10
    }
  });
  