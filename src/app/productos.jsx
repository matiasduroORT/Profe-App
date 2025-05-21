import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Productos() {

    const [productos, setProductos] = useState([])
      const router = useRouter()
    
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
      .then( res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err))
    }, [])
    

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/${item.id}/detalle`)}
        >
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    )
   

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Productos</Text>
        <FlatList
            data={productos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            numColumns={2}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      paddingTop: 50,
    },
    header:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 10
    },
    list:{
        paddingHorizontal: 10,
    },
    card:{
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3
    },
    image:{
        width: 100,
        height: 100,
        resizeMode:'contain'
    },
    title:{
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 5,
    },
    price:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e88e5'
    }
    
  });
  