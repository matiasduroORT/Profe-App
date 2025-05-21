import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DetalleProducto() {

    const { productId} = useLocalSearchParams()
    const [producto, setProducto] = useState(null)


    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${productId}`)
      .then( res => res.json())
      .then(data => {
        setTimeout(() => {
            setProducto(data)
        }, 1000);
    })
      .catch(err => console.error(err))
    }, [])

    if(!producto){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={"red"} />
                <Text style={{ marginTop: 10, fontSize: 26}}>Cargando Producto...</Text>
            </View>
        )
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Image
        source={{uri: producto.image}}
        style={styles.image}
       />
       <Text style={styles.title}>{producto.title}</Text>
       <Text style={styles.price}>{producto.price}</Text>
       <Text style={styles.description}>{producto.description}</Text>
        
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.cartButton} onPress={() => alert('Agregado al carrito')}>
                <Text style={styles.cartText}> Agregar al Carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton} onPress={() => alert('Compra Iniciada')}>
                <Text style={styles.buyText}> Comprar Ahora</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#FFF',
      alignContent: 'center',
      paddingBottom: 40,
    },
    loadingContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width: 260,
        height: 260,
        resizeMode: 'contain',
        marginBottom: 20
    },
    title:{
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        marginBottom: 10,
    },
    price:{
        fontSize: 20,
        fontWeight: '700',
        color: "#43a047",
        marginBottom: 10,
    },
    description:{
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 30,
    },
    buttons:{
        width: '100%',
        gap: 16,
    },
    cartButton:{
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center'
    },
    cartText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600'
    },
    buyButton:{
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#007aff',
        alignItems: 'center'
    },
    buyText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
  });
  